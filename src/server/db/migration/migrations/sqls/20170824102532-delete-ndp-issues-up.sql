DELETE
FROM
  fra_comment c
WHERE
  c.issue_id IN (SELECT id
                 FROM issue i
                 WHERE section = 'NDP');

DELETE
FROM
  issue i
WHERE
  i.section = 'NDP';
