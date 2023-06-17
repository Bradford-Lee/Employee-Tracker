SELECT department.department_name AS departments, role.department_id
FROM role
LEFT JOIN department
ON role.department_id = department_id