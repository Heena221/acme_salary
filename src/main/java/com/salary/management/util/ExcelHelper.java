package com.salary.management.util;

import com.salary.management.entity.Employee;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelHelper {

    public static List<Employee> excelToEmployees(
            InputStream inputStream) {

        List<Employee> employees = new ArrayList<>();

        try (
                Workbook workbook =
                        new XSSFWorkbook(inputStream)
        ) {

            Sheet sheet = workbook.getSheetAt(0);

            boolean firstRow = true;

            for (Row row : sheet) {

                // Skip header
                if (firstRow) {
                    firstRow = false;
                    continue;
                }

                // Skip completely empty rows
                if (row == null) {
                    continue;
                }

                Employee employee = new Employee();

                employee.setName(
                        getStringValue(row.getCell(0))
                );

                employee.setCountry(
                        getStringValue(row.getCell(1))
                );

                employee.setDepartment(
                        getStringValue(row.getCell(2))
                );

                employee.setSalary(
                        getNumericValue(row.getCell(3))
                );

                employee.setCurrency(
                        getStringValue(row.getCell(4))
                );

                employees.add(employee);
            }

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to read Excel file",
                    e
            );
        }

        return employees;
    }


    private static String getStringValue(Cell cell) {

        if (cell == null) {
            return "";
        }

        DataFormatter formatter =
                new DataFormatter();

        return formatter.formatCellValue(cell).trim();
    }


    private static double getNumericValue(Cell cell) {

        if (cell == null) {
            return 0;
        }

        if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getNumericCellValue();
        }

        try {

            return Double.parseDouble(
                    cell.getStringCellValue()
            );

        } catch (Exception e) {

            return 0;
        }
    }
}