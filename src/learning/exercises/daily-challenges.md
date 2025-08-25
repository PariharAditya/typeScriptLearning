# 💪 Daily React + TypeScript Challenges

## **Week 1: Foundation Mastery**

### **Day 1: Advanced Form Handling**

**Time**: 1-2 hours  
**Skill**: Real-world form patterns

#### **Challenge**: Build a Multi-Step Job Application Form

```tsx
interface JobApplication {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    linkedIn?: string;
  };
  experience: {
    currentRole: string;
    yearsExperience: number;
    previousJobs: PreviousJob[];
    skills: string[];
  };
  preferences: {
    desiredRole: string;
    salaryRange: { min: number; max: number };
    location: "remote" | "onsite" | "hybrid";
    startDate: Date;
  };
}
```

**Requirements:**

- 3-step wizard with progress indicator
- Real-time validation on each step
- Save progress to localStorage
- Resume upload simulation
- Generate application summary

---

### **Day 2: Dynamic Component Generation**

**Time**: 1-2 hours  
**Skill**: Flexible UI patterns

#### **Challenge**: Build a Form Builder

Create a system where users can build forms dynamically.

```tsx
type FieldType =
  | "text"
  | "email"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "textarea";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select, radio
  validation?: ValidationRule[];
}

interface DynamicForm {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}
```

**Requirements:**

- Add/remove fields dynamically
- Drag and drop field reordering
- Preview mode
- Export form configuration as JSON
- Generate TypeScript interfaces from form

---

### **Day 3: Performance Optimization**

**Time**: 1-2 hours  
**Skill**: Production performance

#### **Challenge**: Optimize a Slow Component

I'll give you a deliberately inefficient component to optimize.

```tsx
// SLOW VERSION - Fix this!
const SlowProductList: React.FC = () => {
  const [products] = useState(generateLargeProductList(10000));
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // This re-runs on every render!
  const filteredProducts = products
    .filter((p) => p.name.includes(filter))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
    .map((p) => ({
      ...p,
      formattedPrice: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(p.price),
    }));

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search products..."
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>

      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

**Your Task:**

- Implement virtual scrolling
- Add memoization where appropriate
- Debounce search input
- Optimize rendering performance
- Measure and compare performance

---

### **Day 4: Error Handling & Recovery**

**Time**: 1-2 hours  
**Skill**: Production reliability

#### **Challenge**: Build Robust Error Handling

```tsx
interface APIError {
  code: string;
  message: string;
  field?: string;
  retryable: boolean;
}

interface AsyncOperation<T> {
  data: T | null;
  loading: boolean;
  error: APIError | null;
  retry: () => void;
}
```

**Requirements:**

- Create error boundary components
- Implement retry logic with exponential backoff
- Show user-friendly error messages
- Handle network failures gracefully
- Implement fallback UI states

---

### **Day 5: Testing & Quality Assurance**

**Time**: 2-3 hours  
**Skill**: Production testing

#### **Challenge**: Write Comprehensive Tests

For your previous day's components, write:

1. **Unit Tests**

   ```tsx
   // Test custom hooks
   describe("useAsyncOperation", () => {
     it("should handle successful API calls", () => {
       // Your test here
     });
   });
   ```

2. **Integration Tests**

   ```tsx
   // Test component interactions
   describe("ProductList integration", () => {
     it("should filter and sort products correctly", () => {
       // Your test here
     });
   });
   ```

3. **Performance Tests**
   ```tsx
   // Measure component render times
   ```

---

## **Week 2: Advanced Patterns**

### **Day 6: Custom Hook Library**

**Time**: 2-3 hours  
**Skill**: Reusable logic

#### **Challenge**: Build Production-Ready Hooks

Create a library of custom hooks:

```tsx
// useApi - for API calls with caching
function useApi<T>(url: string, options?: RequestOptions): UseApiResult<T>;

// useForm - advanced form management
function useForm<T>(
  initialValues: T,
  validationSchema: ValidationSchema<T>
): UseFormResult<T>;

// useLocalStorage - with TypeScript and error handling
function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void];

// useDebounce - with cleanup
function useDebounce<T>(value: T, delay: number): T;

// usePagination - for large datasets
function usePagination<T>(items: T[], pageSize: number): UsePaginationResult<T>;
```

**Requirements:**

- Full TypeScript support
- Error handling
- Memory leak prevention
- Unit tests for each hook
- Documentation with examples

---

### **Day 7: State Management Patterns**

**Time**: 2-3 hours  
**Skill**: Complex state

#### **Challenge**: Build a Mini Redux

Create your own state management solution:

```tsx
interface StoreState {
  user: UserState;
  products: ProductState;
  cart: CartState;
  ui: UIState;
}

type Action =
  | { type: "USER_LOGIN"; payload: User }
  | { type: "ADD_TO_CART"; payload: { productId: string; quantity: number } }
  | { type: "SET_LOADING"; payload: boolean };

// Your mini-redux implementation
function createStore<T>(initialState: T, reducer: Reducer<T>): Store<T>;
function useStore<T>(selector: (state: T) => any): any;
```

**Requirements:**

- Type-safe actions and state
- Middleware support (logging, persistence)
- React integration
- DevTools support
- Performance optimization

---

## **Week 3: Real-World Integration**

### **Day 8: API Integration**

**Time**: 2-3 hours  
**Skill**: Data fetching

#### **Challenge**: Build API Layer

Create a complete API integration system:

```tsx
interface APIClient {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

interface CacheManager {
  set(key: string, data: any, ttl?: number): void;
  get(key: string): any;
  invalidate(pattern: string): void;
}
```

**Requirements:**

- Request/response interceptors
- Automatic retry with exponential backoff
- Request cancellation
- Response caching
- Error normalization
- Loading states management

---

### **Day 9: Authentication System**

**Time**: 2-3 hours  
**Skill**: Security patterns

#### **Challenge**: Build Auth Flow

```tsx
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue {
  ...AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  refreshToken: () => Promise<void>;
}
```

**Requirements:**

- JWT token handling
- Protected routes
- Auto token refresh
- Persistent sessions
- Role-based access control
- Security best practices

---

### **Day 10: Production Deployment**

**Time**: 2-3 hours  
**Skill**: Deployment & optimization

#### **Challenge**: Optimize for Production

Take any of your previous projects and:

1. **Bundle Optimization**

   ```bash
   # Analyze bundle size
   npm run build
   npm install -g webpack-bundle-analyzer
   npx webpack-bundle-analyzer build/static/js/*.js
   ```

2. **Performance Optimization**

   - Code splitting
   - Lazy loading
   - Image optimization
   - Service worker implementation

3. **SEO & Accessibility**

   - Meta tags
   - Open Graph data
   - Accessibility audit
   - Lighthouse score optimization

4. **Monitoring Setup**
   - Error tracking simulation
   - Performance monitoring
   - User analytics

---

## **🏆 Weekly Challenges**

### **Week 4: Integration Challenge**

Combine all your learnings into a **complete application**:

**Project**: Build a **Restaurant Management System**

- Customer orders management
- Inventory tracking
- Staff scheduling
- Sales analytics
- Multi-tenant support (multiple restaurants)

**Requirements:**

- Use all the patterns you've learned
- Full TypeScript coverage
- Comprehensive testing
- Production-ready deployment
- Documentation

---

## **📊 Progress Tracking**

Create a simple tracking system:

```tsx
interface SkillProgress {
  day: number;
  challenge: string;
  completed: boolean;
  timeSpent: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  notes: string;
  codeQuality: 1 | 2 | 3 | 4 | 5;
}
```

**Daily Reflection Questions:**

1. What was the most challenging part?
2. What new concept did you learn?
3. How would you improve your solution?
4. What would you do differently in a real project?

---

## **🎯 Success Metrics**

By the end of these challenges, you should be able to:

✅ **Build complex, type-safe React applications**  
✅ **Handle real-world performance requirements**  
✅ **Implement production-ready error handling**  
✅ **Write maintainable, testable code**  
✅ **Optimize for production deployment**  
✅ **Handle authentication and authorization**  
✅ **Integrate with APIs effectively**  
✅ **Debug and profile React applications**

---

**Ready to start? Pick Day 1 and let's build your production skills! 🚀**

Which challenge would you like to tackle first?
