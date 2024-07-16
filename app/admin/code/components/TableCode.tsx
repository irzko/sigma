"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { codes } from "@prisma/client";

export default function TableCode({ codes }: { codes: codes[] }) {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="code">Mã</TableColumn>
        <TableColumn key="score">Điểm</TableColumn>
        <TableColumn key="is_used">Trạng thái</TableColumn>
      </TableHeader>
      <TableBody items={codes}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.code}</TableCell>
            <TableCell>{item.score}</TableCell>
            <TableCell>{item.is_used ? "Đã dùng" : "Chưa dùng"}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
