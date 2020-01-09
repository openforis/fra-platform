import React from 'react';
import { classNames, sortVersions } from "./versioningViewUtils";

const VersioningViewTableRow = ({ version, timestamp, name, email, status }) => {
  return <tr>
    <td className={classNames.td}>{version}</td>
    <td className={classNames.td}>{timestamp}</td>
    <td className={classNames.td}>
      <a href={`mailto:${email}`}>{name}</a>
    </td>
    <td className={classNames.td}>{status}</td>
    <td className={classNames.td}>remove []</td>
  </tr>
}

export const VersioningViewTable = (props) => {
  const { versions } = props;
  const thead = ['Version Number', 'Timestamp', 'Created By', 'Status', ''];
  return <table style={{ maxWidth: 700 }} className={classNames.table}>
    <thead>
      <tr>
        <th className={classNames.th} colSpan="5">Database Versions</th>
      </tr>
      <tr>
        {thead.map((title, i) => <th className={classNames.th} key={i}>{title}</th>)}
      </tr>
    </thead>
    <tbody>
      {sortVersions(versions).map((version, i) => <VersioningViewTableRow key={i} {...version} />)}
    </tbody>
  </table>;
};
