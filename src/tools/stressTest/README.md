# Stress test (k6)

Stress tests for data entry on the FRA platform API, one test per case. We simulate many editors writing
data at the same time, which also triggers the validations that run on every edit, while a canary reads
the same data back at a fixed rate.

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
./src/tools/stressTest/run.sh <host> <email> <password> [test]
```

`test` is `tableData` (default) or `ndp`. Locally:

```bash
./src/tools/stressTest/run.sh http://localhost:9001 test@test.com password123
./src/tools/stressTest/run.sh http://localhost:9001 test@test.com password123 ndp
```

The same command works against any environment: pass the environment's host and an account that can
edit the target countries (X09 and X10 by default), or an ADMINISTRATOR account.

The script logs in once, in k6 `setup()`, and reuses the `fra-auth-token` cookie for the whole run.
No token or cookie file is stored. If you already have a valid `fra-auth-token` value, you can skip the
login by running k6 directly:

```bash
k6 run -e HOST=http://localhost:9001 -e TOKEN=token123 src/tools/stressTest/tableData/index.ts
```

The tool refuses to run against the production host (`fra-data.fao.org`).

## What the tests do

Each test runs two scenarios at the same time, for 5 minutes on X09 and X10 by default:

- writers: 100 simulated users repeatedly edit, pausing 5 to 15 seconds between edits like a person would.
- canary: 2 requests per second read the same data back with its validations.

`tableData/` edits table cells (`PATCH table/nodes`, which runs calculations and validations inside the
request); the canary reads `table/table-data` and `validations/table-data`. Table writes can only
overwrite existing cells.

`ndp/` edits existing national data points (`PUT national-data-point/original-data`, the heaviest single
write); the canary reads the same NDP back and `validations/national-data-points`. NDPs are only edited,
never created.

Neither test creates data, so a run leaves nothing behind that needs cleaning up.

The users, countries and duration can be changed with k6 flags, for example
`-e USERS=5 -e DURATION=20s -e COUNTRIES=X09`.



## Files

| File | Role |
| --- | --- |
| `run.sh` | Entry point. Forwards host and credentials to k6 as `-e` flags and picks the test |
| `tableData/` | Table cell edits plus the read canary (see above). One file per action, `index.ts` holds the scenarios |
| `ndp/` | National data point edits plus the read canary (see above). Same layout |
| `auth.ts` | Logs in and returns the `fra-auth-token` cookie. Holds the `TOKEN` override and the production guard |
| `config.ts` | Reads the `-e` values and fails fast when one is missing |
| `random.ts` | `randomInt`, shared by the tests |
