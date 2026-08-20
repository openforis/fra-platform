# Stress test (k6)

Stress tests for data entry on the FRA platform API. We simulate many editors writing data at the same
time, which also triggers the validations that run on every edit.

The scripts in this folder are run by [k6](https://k6.io), not Node. This means:

- They are excluded from tsc and eslint. Running k6 is what validates them.
- Local imports use explicit `.ts` extensions, because the k6 loader requires them.
- Repo modules like `ApiEndPoint` can't be imported here, so URLs are written inline.

## Setup

Install k6 on your machine:

```bash
brew install k6
```

## Usage

```bash
./src/tools/stressTest/run.sh <host> <email> <password>
```

Locally:

```bash
./src/tools/stressTest/run.sh http://localhost:9001 test@test.com password123
```

The same command works against any environment: pass the environment's host and an account that can
edit the target countries (X09 and X10 by default), or an ADMINISTRATOR account.

The script logs in once, in k6 `setup()`, and reuses the `fra-auth-token` cookie for the whole run.
No token or cookie file is stored. If you already have a valid `fra-auth-token` value, you can skip the
login by running k6 directly:

```bash
k6 run -e HOST=http://localhost:9001 -e TOKEN=token123 src/tools/stressTest/dataEntry/index.ts
```

The tool refuses to run against the production host (`fra-data.fao.org`).

## What the test does

`dataEntry/` simulates 100 users working on X09 and X10 for 5 minutes. Each simulated user repeatedly
picks one action, sends the same requests the web client would, then pauses 5 to 15 seconds:

- 5% open the country view: `GET validations/summary`, the most expensive read in the system
- 30% view a section: `GET table/table-data` plus `GET validations/table-data`
- 55% edit a table cell: `PATCH table/nodes`, which runs calculations and validations inside the request
- 10% edit a national data point: `PUT national-data-point/original-data`, the heaviest single write

The users, countries and duration can be changed with k6 flags, for example
`-e USERS=5 -e DURATION=20s -e COUNTRIES=X09`.

National data points are only edited, never created, and table writes can only overwrite existing cells, so a run leaves nothing behind that needs cleaning up.


## Files

| File | Role |
| --- | --- |
| `run.sh` | Entry point. Forwards host and credentials to k6 as `-e` flags |
| `dataEntry/` | The test: simulated users editing and reading data (see above). One file per user action `index.ts` holds the setup and the user loop |
| `auth.ts` | Logs in and returns the `fra-auth-token` cookie. Holds the `TOKEN` override and the production guard |
| `config.ts` | Reads the `-e` values and fails fast when one is missing |
