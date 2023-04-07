import React, { FC } from "react";
import { data } from "../../mockdata/table-data";
import { useState } from "react";
import { createStyles, Table, ScrollArea, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    top: 0,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface DataTableProps {
  // data: { name: string; email: string; company: string }[];
}

const HeadingTextData: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-gray-300">{children}</p>;
};

const TableDataText = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-gray-400">{children}</p>;
};

const DataTable: FC<DataTableProps> = ({}) => {
  const { classes, cx } = useStyles();

  const rows = data.map((row) => (
    <tr className="border-b-slate-800 border-b-2" key={row.name}>
      <td>
        <TableDataText>{row.name}</TableDataText>
      </td>
      <td>
        <TableDataText>{row.email}</TableDataText>
      </td>
      <td>
        <TableDataText>{row.company}</TableDataText>
      </td>
    </tr>
  ));

  return (
    <Table verticalSpacing="sm" miw={600}>
      <thead className={cx(classes.header)}>
        <tr>
          <th>
            <HeadingTextData>Name</HeadingTextData>
          </th>
          <th>
            <HeadingTextData>Email</HeadingTextData>
          </th>
          <th>
            <HeadingTextData>Company</HeadingTextData>
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default DataTable;
