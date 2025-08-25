# 🚀 Production-Ready React + TypeScript Exercises

## **Project-Based Learning - Build Real Applications**

These exercises simulate real-world development scenarios you'll encounter in production environments.

---

## **🏪 Project 1: E-Commerce Product Manager**

**Difficulty**: Intermediate  
**Time**: 3-4 hours  
**Skills**: State management, Forms, API simulation, TypeScript

### **Requirements:**

Build a complete product management system for an e-commerce store.

#### **Core Features:**

1. **Product CRUD Operations**

   - Add new products with validation
   - Edit existing products inline
   - Delete products with confirmation
   - Bulk operations (select multiple, delete selected)

2. **Advanced Filtering & Search**

   - Real-time search by name/description
   - Filter by category, price range, stock status
   - Sort by name, price, date added, stock
   - Pagination (show 10 items per page)

3. **Form Validation**

   - Required fields validation
   - Price validation (positive numbers only)
   - Stock validation (non-negative integers)
   - Category selection from predefined list
   - Image URL validation

4. **Data Persistence**
   - Use localStorage to persist data
   - Import/Export functionality (JSON format)
   - Undo/Redo for recent actions

#### **TypeScript Requirements:**

```tsx
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  imageUrl: string;
  dateAdded: Date;
  isActive: boolean;
}

type ProductCategory = "electronics" | "clothing" | "books" | "home" | "sports";

interface ProductFilters {
  search: string;
  category: ProductCategory | "all";
  priceRange: { min: number; max: number };
  stockStatus: "all" | "inStock" | "outOfStock" | "lowStock";
}
```

#### **Bonus Features:**

- Product image preview
- Bulk edit (change category for multiple products)
- Generate reports (total value, low stock alerts)
- Dark/Light theme toggle

---

## **📊 Project 2: Team Task Management Dashboard**

**Difficulty**: Advanced  
**Time**: 4-5 hours  
**Skills**: Complex state, Context API, Custom hooks, Performance

### **Requirements:**

Build a task management system for software development teams.

#### **Core Features:**

1. **Multi-Project Management**

   - Create/edit/delete projects
   - Assign team members to projects
   - Project status tracking

2. **Advanced Task System**

   - Task creation with rich details
   - Subtasks and dependencies
   - Task status workflow (Todo → In Progress → Review → Done)
   - Priority levels and due dates
   - Time tracking (start/stop timer)

3. **Team Management**

   - Add/remove team members
   - Assign tasks to specific members
   - Workload distribution view
   - Team member availability status

4. **Dashboard & Analytics**
   - Project progress charts
   - Team performance metrics
   - Burndown charts
   - Overdue tasks alerts

#### **TypeScript Requirements:**

```tsx
interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: Date;
  endDate: Date;
  teamMembers: TeamMember[];
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignedTo: string; // team member id
  projectId: string;
  subtasks: Subtask[];
  dependencies: string[]; // task ids
  dueDate: Date;
  timeTracking: TimeEntry[];
  tags: string[];
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  avatar: string;
  isActive: boolean;
  workload: number; // hours per week
}

type TaskStatus = "todo" | "inProgress" | "review" | "done";
type Priority = "low" | "medium" | "high" | "urgent";
type ProjectStatus = "planning" | "active" | "onHold" | "completed";
```

#### **Bonus Features:**

- Drag and drop task reordering
- Real-time notifications
- Export reports to PDF
- Task templates
- Integration simulation (fake API calls)

---

## **🏥 Project 3: Patient Management System**

**Difficulty**: Advanced  
**Time**: 5-6 hours  
**Skills**: Forms, Validation, Security, Accessibility

### **Requirements:**

Build a healthcare patient management system (frontend only).

#### **Core Features:**

1. **Patient Registration**

   - Multi-step registration form
   - Document upload simulation
   - Emergency contact management
   - Medical history recording

2. **Appointment Scheduling**

   - Calendar view for appointments
   - Time slot management
   - Appointment conflicts detection
   - Automated reminders simulation

3. **Medical Records**

   - Patient visit history
   - Prescription management
   - Lab results tracking
   - Document management

4. **Search & Filtering**
   - Advanced patient search
   - Filter by age, condition, last visit
   - Medical history search

#### **TypeScript Requirements:**

```tsx
interface Patient {
  id: string;
  personalInfo: PersonalInfo;
  medicalInfo: MedicalInfo;
  emergencyContacts: EmergencyContact[];
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  documents: Document[];
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  phone: string;
  email: string;
  address: Address;
  insuranceInfo: InsuranceInfo;
}

interface MedicalInfo {
  bloodType: BloodType;
  allergies: Allergy[];
  medications: Medication[];
  conditions: MedicalCondition[];
  emergencyMedicalInfo: string;
}
```

#### **Bonus Features:**

- Accessibility compliance (ARIA labels, keyboard navigation)
- Data encryption simulation
- Audit trail for data changes
- Print patient reports
- Multi-language support

---

## **📈 Project 4: Real-Time Analytics Dashboard**

**Difficulty**: Expert  
**Time**: 6-8 hours  
**Skills**: Performance optimization, Charts, Real-time data, WebSockets simulation

### **Requirements:**

Build a business analytics dashboard with real-time data visualization.

#### **Core Features:**

1. **Data Visualization**

   - Multiple chart types (line, bar, pie, scatter)
   - Interactive charts with drill-down
   - Custom date range selection
   - Real-time data updates

2. **Dashboard Customization**

   - Drag and drop widget arrangement
   - Custom widget creation
   - Dashboard templates
   - Save/load dashboard configurations

3. **Data Management**

   - Import data from CSV/JSON
   - Data filtering and aggregation
   - Custom metrics calculation
   - Data export functionality

4. **Performance Optimization**
   - Virtual scrolling for large datasets
   - Memoization for expensive calculations
   - Lazy loading of components
   - Debounced search and filters

#### **TypeScript Requirements:**

```tsx
interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  position: { x: number; y: number; width: number; height: number };
  config: WidgetConfig;
  dataSource: DataSource;
}

interface DataPoint {
  timestamp: Date;
  value: number;
  category?: string;
  metadata?: Record<string, any>;
}

interface MetricCalculation {
  id: string;
  name: string;
  formula: string;
  dependencies: string[];
  result: number;
}
```

---

## **💰 Project 5: Personal Finance Tracker**

**Difficulty**: Intermediate-Advanced  
**Time**: 4-5 hours  
**Skills**: Charts, Categories, Budgeting, Reports

### **Requirements:**

Build a comprehensive personal finance management application.

#### **Core Features:**

1. **Transaction Management**

   - Add income/expense transactions
   - Categorize transactions
   - Recurring transaction templates
   - Transaction search and filtering

2. **Budget Planning**

   - Create monthly/yearly budgets
   - Category-wise budget allocation
   - Budget vs actual spending comparison
   - Overspending alerts

3. **Financial Reports**

   - Spending trends over time
   - Category-wise analysis
   - Income vs expenses
   - Financial goals tracking

4. **Data Import/Export**
   - Import bank statements (CSV simulation)
   - Export reports
   - Backup and restore

---

## **🎯 Production Best Practices to Implement**

### **Code Quality:**

1. **TypeScript Strict Mode**

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitReturns": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true
     }
   }
   ```

2. **Custom Hooks**

   ```tsx
   // Create reusable hooks for each project
   useLocalStorage, useDebounce, useApi, useForm, etc.
   ```

3. **Error Boundaries**

   ```tsx
   // Implement error handling for production
   class ErrorBoundary extends React.Component { ... }
   ```

4. **Performance Optimization**
   ```tsx
   // Use React.memo, useMemo, useCallback appropriately
   const ExpensiveComponent = React.memo(({ data }) => { ... });
   ```

### **Testing Requirements:**

- Write unit tests for custom hooks
- Test form validation logic
- Test edge cases and error scenarios
- Performance testing for large datasets

### **Accessibility:**

- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

### **Security:**

- Input sanitization
- XSS prevention
- Secure data handling
- Authentication simulation

---

## **📋 Evaluation Criteria**

For each project, you'll be evaluated on:

1. **Functionality** (40%)

   - All features work correctly
   - Edge cases handled
   - User experience

2. **Code Quality** (30%)

   - TypeScript usage
   - Component structure
   - Reusability
   - Performance

3. **Best Practices** (20%)

   - Error handling
   - Accessibility
   - Security considerations
   - Testing

4. **Innovation** (10%)
   - Creative solutions
   - Additional features
   - UI/UX improvements

---

## **🚀 Getting Started**

**Choose ONE project** that interests you most and start building!

1. **Setup**: Create a new folder in your exercises directory
2. **Plan**: Break down the project into smaller components
3. **Build**: Start with basic functionality, then add advanced features
4. **Test**: Test thoroughly with edge cases
5. **Optimize**: Improve performance and accessibility
6. **Document**: Write README with setup and usage instructions

**Need help?** Ask specific questions about implementation challenges, and I'll provide guidance without giving away the complete solution!

Which project interests you most? Let's start building something production-ready! 🔥
