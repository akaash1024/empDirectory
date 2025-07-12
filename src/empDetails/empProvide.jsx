import { createContext, useContext, useState, useMemo } from "react";
import { employees, departments, roles } from "../EmployeesData";

const EMPContext = createContext(null);

export const EMP_Provider = ({ children }) => {
  const [emps, setEmps] = useState(employees);

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    firstName: "",
    department: "",
    role: "",
  });
  const [sortBy, setSortBy] = useState({
    field: "firstName",
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [editingEmployee, setEditingEmployee] = useState(null);

  const [showForm, setShowForm] = useState(false);

  // Filter and search employees
  const filteredEmployees = useMemo(() => {
    let filtered = emps.filter((emp) => {
      const matchesSearch =
        searchTerm === "" ||
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFirstName = filters.firstName === "" || emp.firstName.toLowerCase().includes(filters.firstName.toLowerCase());

      const matchesDepartment = filters.department === "" || emp.department === filters.department;

      const matchesRole = filters.role === "" || emp.role === filters.role;

      return (
        matchesSearch && matchesFirstName && matchesDepartment && matchesRole
      );
    });

    // Sort employees
    filtered.sort((a, b) => {
      const aValue = a[sortBy.field].toLowerCase();
      const bValue = b[sortBy.field].toLowerCase();

      if (sortBy.direction === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [emps, searchTerm, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  // CRUD Operations
  const addEmployee = (newEmployee) => {
    const employeeWithId = {
      ...newEmployee,
      id: Math.max(...emps.map((emp) => emp.id)) + 1,
      empProfile: `https://i.pravatar.cc/150?img=${
        Math.floor(Math.random() * 70) + 1
      }`,
    };
    setEmps([...emps, employeeWithId]);
    setShowForm(false);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmps(
      emps.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    setEditingEmployee(null);
    setShowForm(false);
  };

  const deleteEmployee = (id) => {
    setEmps(emps.filter((emp) => emp.id !== id));
    // Reset to first page if current page becomes empty
    if (currentEmployees.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const editEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({ firstName: "", department: "", role: "" });
    setSortBy({ field: "firstName", direction: "asc" });
    setCurrentPage(1);
  };

  let empCount = emps.length;
  // Clear form
  const clearForm = () => {
    setEditingEmployee(null);
    setShowForm(false);
  };

  const value = {
    // State
    emps,
    searchTerm,
    filters,
    sortBy,
    currentPage,
    itemsPerPage,
    editingEmployee,
    showForm,
    empCount,

    // Computed values
    filteredEmployees,
    currentEmployees,
    totalPages,
    departments,
    roles,

    // Actions
    setSearchTerm,
    setFilters,
    setSortBy,
    setCurrentPage,
    setItemsPerPage,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    editEmployee,
    resetFilters,
    clearForm,
    setShowForm,
  };

  return <EMPContext.Provider value={value}>{children}</EMPContext.Provider>;
};

export const useEMP = () => {
  const context = useContext(EMPContext);
  if (!context) {
    throw new Error("useEMP must be used within an EMP_Provider");
  }
  return context;
};
