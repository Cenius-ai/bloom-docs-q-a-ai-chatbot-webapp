import { Injectable } from '@angular/core';
import { Document } from '../models/document.model';
import { Conversation } from '../models/conversation.model';
import { Message, createMessage } from '../models/message.model';

const SEEDED_DOCUMENTS: Document[] = [
  {
    id: 'doc-ts-basics',
    title: 'Getting Started with TypeScript',
    category: 'Languages',
    excerpt: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
    content: `TypeScript is a strongly typed programming language that builds on JavaScript. It adds static type definitions, enabling better IDE support, code navigation, and refactoring.

## Core Concepts

TypeScript's type system allows you to describe the shape of objects and functions. You can define interfaces, type aliases, enums, and union types to model your data precisely.

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

## Type Inference

TypeScript can infer types from context, reducing the need for explicit annotations. The compiler tracks how values flow through your program and catches type mismatches before they cause runtime errors.

## Strict Mode

Enable strict mode in tsconfig.json for the strongest type checking. This includes strictNullChecks, noImplicitAny, and strictFunctionTypes — collectively preventing entire classes of bugs.`
  },
  {
    id: 'doc-angular-components',
    title: 'Angular Component Architecture',
    category: 'Frameworks',
    excerpt: 'Angular components are the fundamental building blocks of Angular applications, encapsulating template, styles, and behavior.',
    content: `Angular components are the fundamental building blocks of any Angular application. Each component encapsulates its own HTML template, CSS styles, and TypeScript logic.

## Standalone Components

Since Angular 15, standalone components have become the recommended approach. They are self-contained and don't require declaration in an NgModule.

\`\`\`typescript
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  template: \`<div class="card">{{ user.name }}</div>\`,
  styles: [\`.card { padding: 16px; }\`]
})
export class UserCardComponent {
  @Input() user!: User;
}
\`\`\`

## Component Lifecycle

Angular components have a well-defined lifecycle with hooks like ngOnInit, ngOnChanges, and ngOnDestroy. Use these to initialize data, respond to input changes, and clean up subscriptions.

## Change Detection

Angular uses zone.js for automatic change detection. With signals (introduced in Angular 16+), you get fine-grained reactivity that improves performance by tracking exactly which parts of the DOM need updating.`
  },
  {
    id: 'doc-css-grid',
    title: 'Understanding CSS Grid Layout',
    category: 'CSS',
    excerpt: 'CSS Grid Layout is a two-dimensional layout system that revolutionized how we build complex web layouts.',
    content: `CSS Grid Layout is a powerful two-dimensional layout system that lets you control both columns and rows simultaneously. It's ideal for page-level layouts and complex component arrangements.

## Grid Container

Define a grid container with \`display: grid\`. Use \`grid-template-columns\` and \`grid-template-rows\` to establish the track structure.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  min-height: 100vh;
}
\`\`\`

## Grid Items

Position items using \`grid-column\` and \`grid-row\` shorthand properties. The \`fr\` unit distributes available space proportionally, making responsive layouts straightforward.

## Named Areas

Grid template areas provide a visual way to define layouts. Name your areas and assign them to elements — the resulting code reads like a wireframe:

\`\`\`css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
\`\`\`

## Responsive Patterns

Combine Grid with media queries or use \`auto-fill\` / \`auto-fit\` with \`minmax()\` for responsive grids that adapt without breakpoints.`
  },
  {
    id: 'doc-python-data',
    title: 'Python for Data Science',
    category: 'Languages',
    excerpt: 'Python has become the dominant language for data science thanks to its rich ecosystem of libraries for analysis, visualization, and machine learning.',
    content: `Python's ecosystem of data science libraries — NumPy, Pandas, Matplotlib, and Scikit-learn — makes it the go-to language for data analysis and machine learning.

## Pandas Fundamentals

Pandas provides DataFrames, two-dimensional labeled data structures that are perfect for tabular data. Load CSV files, filter rows, group by categories, and compute aggregations with expressive, chainable syntax.

\`\`\`python
import pandas as pd

df = pd.read_csv('sales.csv')
monthly = df.groupby('month')['revenue'].sum()
top_products = df[df['revenue'] > 1000].sort_values('revenue', ascending=False)
\`\`\`

## NumPy Arrays

NumPy arrays are the foundation. They're homogeneous, multi-dimensional, and orders of magnitude faster than Python lists for numerical operations thanks to vectorized computation.

## Visualization with Matplotlib

Create publication-quality charts. Start with \`plt.subplots()\`, layer your data with \`.plot()\`, \`.scatter()\`, or \`.bar()\`, and customize every element — labels, ticks, colors, and legends.

## Machine Learning with Scikit-learn

Scikit-learn provides a consistent API for classification, regression, clustering, and dimensionality reduction. The typical workflow: import an estimator, call \`.fit()\`, then \`.predict()\` or \`.transform()\`.`
  },
  {
    id: 'doc-rest-api',
    title: 'REST API Design Principles',
    category: 'Architecture',
    excerpt: 'Well-designed REST APIs follow consistent patterns for resource naming, HTTP methods, status codes, and error handling.',
    content: `REST (Representational State Transfer) APIs use standard HTTP methods and status codes to provide a predictable interface for client-server communication.

## Resource Naming

Use plural nouns for collection endpoints. Keep URLs hierarchical and avoid verbs — the HTTP method already describes the action.

\`\`\`
GET    /api/users          # List users
POST   /api/users          # Create user
GET    /api/users/:id      # Get single user
PATCH  /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user
GET    /api/users/:id/posts # Get user's posts
\`\`\`

## HTTP Status Codes

Return appropriate codes: 200 for success, 201 for creation, 204 for deletion, 400 for validation errors, 401 for authentication failures, 403 for authorization failures, 404 for missing resources, and 500 for unexpected server errors.

## Error Response Format

Provide consistent error envelopes. Every error response should include a machine-readable error code, a human-readable message, and optionally field-level validation details.

## Pagination

Paginate list endpoints with \`page\` and \`per_page\` query parameters. Include pagination metadata — total count, current page, and links to next/previous pages — in the response body or Link headers.`
  },
  {
    id: 'doc-docker-guide',
    title: 'Docker Containerization Guide',
    category: 'DevOps',
    excerpt: 'Docker packages applications into lightweight, portable containers that run consistently across any environment.',
    content: `Docker containers package an application with all its dependencies into a standardized unit that runs identically on any Linux host.

## Dockerfile Basics

A Dockerfile is a script of instructions that builds an image. Start from a base image, copy your application code, install dependencies, and define the runtime command.

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Multi-stage Builds

Use multi-stage builds to keep production images small. Build your application in one stage with all dev dependencies, then copy only the artifacts into a minimal runtime stage.

## Docker Compose

Define multi-container applications in a single docker-compose.yml file. Spin up your app, database, cache, and any supporting services with one command: \`docker compose up\`.

## Best Practices

Use specific base image tags (not \`latest\`), minimize layers by combining RUN commands, leverage \`.dockerignore\` to exclude unnecessary files, and never store secrets in image layers.`
  },
  {
    id: 'doc-git-practices',
    title: 'Git Version Control Best Practices',
    category: 'DevOps',
    excerpt: 'Git is the universal version control system. Effective branching strategies and commit discipline keep projects maintainable.',
    content: `Git's distributed model gives every developer a full copy of the repository history. Mastering its workflows is essential for team collaboration.

## Commit Messages

Write clear, atomic commits. Use the conventional commits format: \`type(scope): description\`. Types include feat, fix, docs, refactor, test, and chore. The scope identifies the affected module.

\`\`\`
feat(auth): add password reset flow
fix(api): handle null user in profile endpoint
docs(readme): update deployment instructions
\`\`\`

## Branching Strategies

GitHub Flow is the simplest effective strategy: a main branch that's always deployable, feature branches for all work, and pull requests for code review. For release-heavy projects, GitFlow adds develop and release branches.

## Rebasing vs Merging

Rebase feature branches onto main before merging to maintain a linear history. Use interactive rebase (\`git rebase -i\`) to squash, reorder, or reword commits before sharing them.

## Useful Commands

\`git stash\` temporarily shelves changes. \`git bisect\` finds the commit that introduced a bug. \`git reflog\` recovers seemingly lost commits. \`git cherry-pick\` applies specific commits to another branch.`
  },
  {
    id: 'doc-react-state',
    title: 'React State Management Patterns',
    category: 'Frameworks',
    excerpt: 'Managing state effectively is the core challenge in React applications. From useState to global stores, choose the right pattern for your needs.',
    content: `React provides several built-in mechanisms for managing state, and the ecosystem offers powerful libraries for complex scenarios.

## useState and useReducer

For local component state, \`useState\` covers most cases. When state logic becomes complex — multiple sub-values or transitions that depend on previous state — switch to \`useReducer\` for predictable state updates modeled as actions.

\`\`\`tsx
const [todos, dispatch] = useReducer(todosReducer, []);

function todosReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'add': return [...state, action.payload];
    case 'toggle': return state.map(t =>
      t.id === action.id ? { ...t, done: !t.done } : t
    );
    default: return state;
  }
}
\`\`\`

## Context API

React Context avoids prop drilling by making values available to the entire subtree. Pair it with useReducer for a lightweight global store. For performance, split contexts by domain so updates to one don't re-render consumers of another.

## External Libraries

Zustand offers a minimal API with no boilerplate. Redux Toolkit provides a batteries-included approach with middleware, devtools, and entity adapters. Choose based on team familiarity and application complexity.

## Server State

For data fetched from APIs, libraries like React Query (TanStack Query) handle caching, background refetching, and optimistic updates — treating server state as fundamentally different from UI state.`
  },
  {
    id: 'doc-sql-optimization',
    title: 'SQL Query Optimization Techniques',
    category: 'Databases',
    excerpt: 'Well-optimized SQL queries are essential for application performance. Learn how indexing, query structure, and execution plans affect speed.',
    content: `SQL query performance depends on proper indexing, efficient query structure, and understanding how the database engine executes your statements.

## Indexing Strategy

Indexes are the single most impactful optimization. Create indexes on columns used in WHERE, JOIN, and ORDER BY clauses. Composite indexes serve queries that filter on multiple columns together.

\`\`\`sql
CREATE INDEX idx_orders_customer_date
  ON orders (customer_id, created_at DESC);

SELECT * FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC
LIMIT 10;
\`\`\`

## Understanding EXPLAIN

Use EXPLAIN (or EXPLAIN ANALYZE) to see the query execution plan. Look for sequential scans on large tables (indicating missing indexes), high row estimates, and nested loop joins that could be hash joins.

## Avoiding Common Pitfalls

Avoid SELECT * in production code — fetch only the columns you need. Be careful with OR conditions, which can prevent index usage. Use EXISTS instead of IN for subqueries when checking for related rows.

## Connection Pooling

Each query requires a database connection. Use a connection pool (PgBouncer for PostgreSQL, built-in pooling in most ORMs) to reuse connections rather than opening a new one per request.`
  },
  {
    id: 'doc-linux-admin',
    title: 'Linux System Administration Essentials',
    category: 'DevOps',
    excerpt: 'Linux administration skills are fundamental for developers working with servers. Master the command line, process management, and system monitoring.',
    content: `Linux powers the vast majority of servers. Understanding core administration concepts makes you a more effective developer.

## File System Navigation

The Linux file system is a single tree rooted at /. Key directories: /etc for configuration, /var for variable data (logs, databases), /home for user files, /tmp for temporary files, and /usr for installed software.

\`\`\`bash
find /var/log -name "*.log" -mtime -7
du -sh /home/* | sort -rh | head -5
grep -r "ERROR" /var/log/myapp/ | tail -20
\`\`\`

## Process Management

Use \`ps aux\` to list processes, \`top\` or \`htop\` for interactive monitoring, and \`kill\` with signals to control them. Systemd manages services — use \`systemctl start|stop|status|enable\` to control daemons.

## Permissions

File permissions use three triples (user, group, others) of read (4), write (2), and execute (1). Use \`chmod\`, \`chown\`, and \`chgrp\` to manage access. \`sudo\` grants temporary root privileges for administrative tasks.

## Monitoring and Logs

Monitor disk usage with \`df -h\` and \`du\`. Check memory with \`free -h\`. Inspect system logs with \`journalctl\`. Set up log rotation with logrotate to prevent disk exhaustion from growing log files.`
  }
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Languages': ['typescript', 'python', 'javascript', 'type', 'interface', 'function', 'variable', 'class', 'compiler', 'pandas', 'numpy'],
  'Frameworks': ['angular', 'react', 'component', 'state', 'props', 'hook', 'signal', 'lifecycle', 'change detection', 'standalone'],
  'CSS': ['css', 'grid', 'layout', 'flexbox', 'responsive', 'template', 'gap', 'column', 'row', 'fr unit'],
  'Architecture': ['api', 'rest', 'http', 'endpoint', 'status code', 'resource', 'json', 'paginate', 'error'],
  'DevOps': ['docker', 'container', 'git', 'linux', 'commit', 'branch', 'merge', 'deploy', 'server', 'systemd', 'permission'],
  'Databases': ['sql', 'query', 'index', 'database', 'table', 'select', 'join', 'postgres', 'performance', 'explain'],
};

function scoreDocument(query: string, doc: Document): number {
  const lower = query.toLowerCase();
  const words = lower.split(/\s+/).filter(w => w.length > 1);
  let score = 0;

  for (const word of words) {
    const inTitle = (doc.title.toLowerCase().match(new RegExp(word, 'g')) || []).length;
    const inContent = (doc.content.toLowerCase().match(new RegExp(word, 'g')) || []).length;
    score += inTitle * 5 + inContent * 1;
  }

  const categoryKw = CATEGORY_KEYWORDS[doc.category] ?? [];
  for (const kw of categoryKw) {
    if (lower.includes(kw)) {
      score += 3;
    }
  }

  return score;
}

function findBestExcerpt(doc: Document, query: string, maxLen: number = 200): string {
  const lower = query.toLowerCase();
  const words = lower.split(/\s+/).filter(w => w.length > 2);
  const paragraphs = doc.content.split(/\n\n+/);

  let bestParagraph = paragraphs[0];
  let bestScore = 0;

  for (const para of paragraphs) {
    let s = 0;
    for (const word of words) {
      s += (para.toLowerCase().match(new RegExp(word, 'g')) || []).length;
    }
    if (s > bestScore) {
      bestScore = s;
      bestParagraph = para;
    }
  }

  if (bestParagraph.length > maxLen) {
    return bestParagraph.substring(0, maxLen).replace(/\s+\S*$/, '') + '…';
  }
  return bestParagraph;
}

const SEEDED_CONVERSATIONS: Conversation[] = (() => {
  const now = Date.now();
  const mins = (m: number) => new Date(now - m * 60_000).toISOString();

  const conv1: Conversation = {
    id: 'conv-seeded-1',
    title: 'Understanding TypeScript strict mode',
    createdAt: mins(120),
    updatedAt: mins(30),
    messages: [
      createMessage('conv-seeded-1', 'user', 'What are the benefits of enabling TypeScript strict mode?', undefined),
      createMessage('conv-seeded-1', 'assistant',
        'TypeScript strict mode enables a suite of stronger type-checking flags that catch entire classes of bugs at compile time. The key flags include:\n\n1. **strictNullChecks** — prevents null and undefined from being assignable to any type unless explicitly declared, eliminating the dreaded "cannot read property of null" runtime error.\n\n2. **noImplicitAny** — requires explicit types anywhere TypeScript cannot infer them, surfacing hidden type gaps in your codebase.\n\n3. **strictFunctionTypes** — enforces contravariant parameter checking, making function type assignments sound.\n\nEnabling strict mode is the single highest-impact change you can make to a TypeScript project. It typically reveals dozens of potential bugs in existing codebases, but each one it finds is a runtime crash prevented.',
        [
          { id: 'src-1', title: 'Getting Started with TypeScript', excerpt: findBestExcerpt(SEEDED_DOCUMENTS[0], 'strict mode') }
        ]
      ),
      createMessage('conv-seeded-1', 'user', 'How do I enable it in an existing project?', undefined),
      createMessage('conv-seeded-1', 'assistant',
        'To enable strict mode in an existing project, set `"strict": true` in your tsconfig.json. However, I recommend a gradual approach for large codebases:\n\n1. First, run `tsc --noEmit` with strict off to see how many errors you have.\n2. Enable strictNullChecks alone and fix those errors first — they tend to be the most impactful.\n3. Then enable noImplicitAny and address those.\n4. Finally set `"strict": true` which also enables strictFunctionTypes and other flags.\n\nMany teams add `// @ts-expect-error` comments temporarily with tracking tickets, making the migration incremental rather than blocking.',
        [
          { id: 'src-2', title: 'Getting Started with TypeScript', excerpt: 'Enable strict mode in tsconfig.json for the strongest type checking. This includes strictNullChecks, noImplicitAny, and strictFunctionTypes — collectively preventing entire classes of bugs.' }
        ]
      ),
    ],
  };

  const conv2: Conversation = {
    id: 'conv-seeded-2',
    title: 'Docker multi-stage builds explained',
    createdAt: mins(200),
    updatedAt: mins(90),
    messages: [
      createMessage('conv-seeded-2', 'user', 'Can you explain Docker multi-stage builds and why they are useful?', undefined),
      createMessage('conv-seeded-2', 'assistant',
        'Docker multi-stage builds let you use multiple FROM statements in a single Dockerfile. Each FROM begins a new stage, and you can copy artifacts from earlier stages into later ones.\n\nThe primary benefit is **image size reduction**. In a typical Node.js app, you need the full dev toolchain to build (TypeScript compiler, bundlers, dev dependencies) but only the compiled output and production dependencies to run. Multi-stage builds separate these concerns:\n\n- **Stage 1 (build):** Install all dependencies, run the build, produce the dist folder.\n- **Stage 2 (runtime):** Copy only package.json, install production dependencies, and copy the dist from stage 1.\n\nThe final image contains only what the app needs at runtime — often 5-10x smaller than a single-stage build. Smaller images mean faster pulls, less disk usage, and a reduced attack surface.',
        [
          { id: 'src-3', title: 'Docker Containerization Guide', excerpt: 'Use multi-stage builds to keep production images small. Build your application in one stage with all dev dependencies, then copy only the artifacts into a minimal runtime stage.' }
        ]
      ),
    ],
  };

  const conv3: Conversation = {
    id: 'conv-seeded-3',
    title: 'CSS Grid vs Flexbox — when to use which',
    createdAt: mins(350),
    updatedAt: mins(180),
    messages: [
      createMessage('conv-seeded-3', 'user', "I'm building a dashboard layout. Should I use CSS Grid or Flexbox?", undefined),
      createMessage('conv-seeded-3', 'assistant',
        'For a **dashboard layout**, CSS Grid is the better choice. Here\'s why:\n\nCSS Grid is a **two-dimensional** layout system — it controls both columns and rows simultaneously. Dashboards typically have a structured layout with a header, sidebar, main content area, and possibly multiple panels arranged in both dimensions.\n\nUse Grid for:\n- Page-level layouts (header + sidebar + content + footer)\n- Card grids where items need to align in both directions\n- Complex component layouts where items span multiple rows or columns\n\nUse Flexbox for:\n- Navigation bars and toolbars (one-dimensional flow)\n- Centering content within a container\n- Form layouts where fields stack or flow in one direction\n\nThe two work beautifully together: use Grid for the overall page skeleton, and Flexbox inside grid areas for component-level alignment.',
        [
          { id: 'src-4', title: 'Understanding CSS Grid Layout', excerpt: 'CSS Grid Layout is a powerful two-dimensional layout system that lets you control both columns and rows simultaneously. It\'s ideal for page-level layouts and complex component arrangements.' }
        ]
      ),
      createMessage('conv-seeded-3', 'user', 'What about responsiveness? Do I need media queries?', undefined),
      createMessage('conv-seeded-3', 'assistant',
        'Grid gives you several tools to build responsive layouts without heavy media query reliance:\n\n1. **auto-fill / auto-fit with minmax()** — `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` creates a grid that automatically adjusts column count as the container width changes. No breakpoints needed.\n\n2. **The fr unit** — distributes available space proportionally. A sidebar of `200px` with the rest as `1fr` adapts naturally.\n\n3. **grid-template-areas with media queries** — define your layout visually for different breakpoints by re-assigning areas. This pattern is exceptionally readable.\n\nFor your dashboard, start with auto-fit/minmax for the panel grid, and use a single media query to collapse the sidebar into a top bar on mobile. That\'s often all you need.',
        [
          { id: 'src-5', title: 'Understanding CSS Grid Layout', excerpt: 'Combine Grid with media queries or use auto-fill / auto-fit with minmax() for responsive grids that adapt without breakpoints.' }
        ]
      ),
    ],
  };

  const conv4: Conversation = {
    id: 'conv-seeded-4',
    title: 'SQL query running slow — optimization tips',
    createdAt: mins(500),
    updatedAt: mins(420),
    messages: [
      createMessage('conv-seeded-4', 'user', 'My SQL query is running slow on a table with 2 million rows. What should I check first?', undefined),
      createMessage('conv-seeded-4', 'assistant',
        'When a query is slow on a large table, follow this diagnostic checklist in order:\n\n1. **Run EXPLAIN ANALYZE** — This shows you the actual execution plan. Look for "Seq Scan" on large tables, which means the database is reading every row. That\'s your signal that an index is missing.\n\n2. **Check your WHERE clause columns** — Each column used for filtering needs an index. For composite conditions like `WHERE status = \'active\' AND created_at > \'2024-01-01\'`, a composite index on `(status, created_at)` is optimal.\n\n3. **Avoid functions on indexed columns** — `WHERE LOWER(email) = \'user@example.com\'` cannot use a standard index. Either create a functional index or store the normalized value.\n\n4. **Review your JOINs** — Ensure foreign key columns are indexed. Without them, each join becomes a nested loop scan.\n\n5. **Check for implicit type conversions** — Comparing a string column against an integer (`WHERE id = \'42\'`) can prevent index usage in some databases.\n\nStart with EXPLAIN ANALYZE — it will almost always point directly at the bottleneck.',
        [
          { id: 'src-6', title: 'SQL Query Optimization Techniques', excerpt: 'Use EXPLAIN (or EXPLAIN ANALYZE) to see the query execution plan. Look for sequential scans on large tables (indicating missing indexes), high row estimates, and nested loop joins.' }
        ]
      ),
    ],
  };

  const conv5: Conversation = {
    id: 'conv-seeded-5',
    title: 'REST API error response best practices',
    createdAt: mins(800),
    updatedAt: mins(700),
    messages: [
      createMessage('conv-seeded-5', 'user', 'What\'s the recommended format for REST API error responses?', undefined),
      createMessage('conv-seeded-5', 'assistant',
        'A well-designed REST API error response should be **consistent across all endpoints** so clients can handle errors programmatically. Here\'s the recommended structure:\n\n```json\n{\n  "error": {\n    "code": "VALIDATION_ERROR",\n    "message": "The request contained invalid parameters.",\n    "details": [\n      {\n        "field": "email",\n        "message": "Must be a valid email address"\n      }\n    ],\n    "request_id": "req_abc123"\n  }\n}\n```\n\nKey principles:\n- **Error code** — A machine-readable, stable string (not an integer). Clients can switch on it.\n- **Message** — Human-readable, suitable for display. Keep it concise.\n- **Details** — Optional, for validation errors. List each field error separately so forms can map them to inputs.\n- **Request ID** — Include a unique identifier for debugging. Log it server-side alongside the full error context.\n\nPair this with proper HTTP status codes: 400 for validation, 401 for auth, 403 for forbidden, 404 for not found, 409 for conflicts, and 422 for semantic errors. Never return a 200 with an error body.',
        [
          { id: 'src-7', title: 'REST API Design Principles', excerpt: 'Provide consistent error envelopes. Every error response should include a machine-readable error code, a human-readable message, and optionally field-level validation details.' }
        ]
      ),
    ],
  };

  return [conv1, conv2, conv3, conv4, conv5];
})();

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private documents: Document[] = [];

  constructor() {
    this.loadDocuments();
  }

  private loadDocuments(): void {
    const stored = localStorage.getItem('bloom-documents');
    if (stored) {
      try {
        this.documents = JSON.parse(stored);
      } catch {
        this.documents = [...SEEDED_DOCUMENTS];
        this.persistDocuments();
      }
    } else {
      this.documents = [...SEEDED_DOCUMENTS];
      this.persistDocuments();
    }
  }

  private persistDocuments(): void {
    localStorage.setItem('bloom-documents', JSON.stringify(this.documents));
  }

  getDocuments(): Document[] {
    return this.documents;
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find(d => d.id === id);
  }

  getSeededConversations(): Conversation[] {
    return SEEDED_CONVERSATIONS.map(c => ({ ...c, messages: [...c.messages] }));
  }

  generateResponse(query: string): { content: string; sources: { id: string; title: string; excerpt: string }[] } {
    const scored = this.documents
      .map(doc => ({ doc, score: scoreDocument(query, doc) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
      return {
        content: "I don't have enough information in my document library to answer this question. Try asking about TypeScript, Angular, CSS Grid, Python data science, REST APIs, Docker, Git, React state management, SQL optimization, or Linux administration.",
        sources: [],
      };
    }

    const topDocs = scored.slice(0, 3);
    const sources = topDocs.map(({ doc }) => ({
      id: doc.id,
      title: doc.title,
      excerpt: findBestExcerpt(doc, query),
    }));

    const primaryDoc = topDocs[0].doc;
    const response = this.buildResponse(query, primaryDoc, topDocs.map(t => t.doc));

    return { content: response, sources };
  }

  private buildResponse(query: string, primary: Document, topDocs: Document[]): string {
    const lower = query.toLowerCase();

    if (lower.includes('typescript') || lower.includes('strict')) {
      return `TypeScript's type system helps catch errors before they reach production. ${primary.title} covers this in detail.\n\nKey takeaways:\n- Static types enable better IDE autocompletion and refactoring\n- Strict mode catches null-reference errors, implicit any types, and unsound function assignments\n- You can adopt it incrementally in existing projects — start with strictNullChecks\n\nFor more depth, check the TypeScript documentation and the Angular style guide for TypeScript best practices.`;
    }

    if (lower.includes('angular') || lower.includes('component')) {
      return `Angular components are self-contained units that combine template, styles, and logic. Modern Angular (15+) recommends standalone components for simpler architecture.\n\nEvery component has:\n- A TypeScript class with the @Component decorator\n- An HTML template defining the view\n- Scoped CSS styles\n- Lifecycle hooks (ngOnInit, ngOnChanges, ngOnDestroy)\n\nSignals (Angular 16+) provide fine-grained reactivity that improves on zone.js-based change detection.`;
    }

    if (lower.includes('css') || lower.includes('grid') || lower.includes('layout') || lower.includes('flexbox')) {
      return `CSS Grid and Flexbox complement each other for modern layout. Grid handles two-dimensional layouts (rows AND columns) — perfect for page skeletons and dashboards. Flexbox excels at one-dimensional flow — ideal for nav bars, toolbars, and component internals.\n\nFor responsive designs, use Grid's auto-fit/minmax pattern to create layouts that adapt without media queries. Combine both: Grid for the overall structure, Flexbox inside each grid area for content alignment.`;
    }

    if (lower.includes('python') || lower.includes('data') || lower.includes('pandas')) {
      return `Python's data science stack — NumPy, Pandas, Matplotlib, and Scikit-learn — provides everything you need for data analysis and machine learning.\n\nStart with Pandas DataFrames for loading and cleaning data, use NumPy for numerical operations, visualize with Matplotlib, and apply Scikit-learn's consistent fit/predict API for modeling. The key is understanding when to use each tool in the pipeline.`;
    }

    if (lower.includes('api') || lower.includes('rest') || lower.includes('endpoint')) {
      return `REST APIs should follow consistent conventions. Use plural nouns for collection endpoints, standard HTTP methods (GET/POST/PATCH/DELETE), and proper status codes.\n\nEvery error response needs a machine-readable code, human-readable message, and optional field-level details. Always include pagination metadata on list endpoints. The consistency is what makes an API predictable and easy to integrate with.`;
    }

    if (lower.includes('docker') || lower.includes('container')) {
      return `Docker multi-stage builds are the key to small, secure production images. Build in one stage with all dev tooling, then copy only runtime artifacts into a minimal final image.\n\nBest practices: use specific base image tags, combine RUN commands to reduce layers, leverage .dockerignore, and never store secrets in image layers. For multi-service apps, Docker Compose orchestrates everything with one command.`;
    }

    if (lower.includes('git') || lower.includes('commit') || lower.includes('branch')) {
      return `Git best practices start with clear, atomic commits using the conventional format: type(scope): description. Use feature branches, review with pull requests, and rebase before merging to maintain a clean history.\n\nKey commands to master: git stash, git bisect, git reflog, and interactive rebase. These turn Git from a simple VCS into a powerful debugging and history-management tool.`;
    }

    if (lower.includes('react') || lower.includes('state') || lower.includes('hook')) {
      return `React state management follows a spectrum: useState for local state, useReducer for complex local logic, Context for shared state, and libraries like Zustand or Redux Toolkit for global stores.\n\nFor server data, TanStack Query handles caching and synchronization automatically. The golden rule: don't put server state in UI state management — they have fundamentally different lifecycles.`;
    }

    if (lower.includes('sql') || lower.includes('query') || lower.includes('database') || lower.includes('index')) {
      return `SQL query optimization starts with EXPLAIN ANALYZE. Look for sequential scans — they indicate missing indexes. Create indexes on columns used in WHERE, JOIN, and ORDER BY clauses.\n\nAvoid SELECT *, use EXISTS instead of IN for subqueries, and be careful with OR conditions that prevent index usage. For production, always use connection pooling to manage database connections efficiently.`;
    }

    if (lower.includes('linux') || lower.includes('server') || lower.includes('command') || lower.includes('systemd')) {
      return `Linux administration essentials: master the file system hierarchy (/etc for config, /var for data, /home for users), process management with ps/top/systemctl, and permission management with chmod/chown.\n\nFor monitoring, use df/du for disk, free for memory, and journalctl for logs. Set up logrotate to prevent disk exhaustion. These fundamentals apply to both development and production environments.`;
    }

    return `Based on the document library, here's what I found about "${query}":\n\n${primary.title} is the most relevant resource. ${primary.excerpt}\n\nYou might also find related information in ${topDocs.length > 1 ? topDocs[1].title : 'the document library'}. Let me know if you'd like me to dive deeper into any aspect.`;
  }
}
