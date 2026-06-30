import { useState } from "react";
import { Plus } from "lucide-react";
import { Badge } from "../components/common/Badge";
import { motion } from "framer-motion";

interface Issue {
  id: number;
  title: string;
  type: string;
  priority: string;
  assignee: string;
}

interface Column {
  id: string;
  title: string;
  issues: Issue[];
}

const initialColumns: Column[] = [
  { id: "backlog", title: "Backlog", issues: [
    { id: 1, title: "Implement dark mode", type: "feature", priority: "high", assignee: "Abdulraheem" }
  ]},
  { id: "todo", title: "To Do", issues: [
    { id: 2, title: "Fix login bug", type: "bug", priority: "critical", assignee: "Developer" }
  ]},
  { id: "in_progress", title: "In Progress", issues: [
    { id: 3, title: "User authentication", type: "feature", priority: "high", assignee: "Abdulraheem" }
  ]},
  { id: "review", title: "Code Review", issues: [] },
  { id: "testing", title: "Testing", issues: [] },
  { id: "done", title: "Done", issues: [
    { id: 4, title: "Setup project", type: "task", priority: "high", assignee: "Abdulraheem" }
  ]},
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical": return "bg-red-500";
    case "high": return "bg-orange-500";
    case "medium": return "bg-yellow-500";
    default: return "bg-green-500";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "bug": return "bg-red-500/10 text-red-500";
    case "feature": return "bg-green-500/10 text-green-500";
    case "enhancement": return "bg-blue-500/10 text-blue-500";
    default: return "bg-gray-500/10 text-gray-500";
  }
};

const IssueCard = ({ issue }: { issue: Issue }) => (
  <motion.div
    className="p-3 rounded-lg bg-card border border-border shadow-sm cursor-grab"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="flex justify-between items-start mb-2">
      <span className={"text-xs font-medium px-2 py-0.5 rounded " + getTypeColor(issue.type)}>
        {issue.type}
      </span>
      <span className="text-xs text-muted-foreground">#{issue.id}</span>
    </div>
    <h4 className="font-medium text-sm mb-2">{issue.title}</h4>
    <div className="flex justify-between items-center">
      <div className={"w-2 h-2 rounded-full " + getPriorityColor(issue.priority)} />
      <span className="text-xs text-muted-foreground">{issue.assignee || "Unassigned"}</span>
    </div>
  </motion.div>
);

const ColumnComponent = ({ column }: { column: Column }) => (
  <motion.div
    className="flex-1 min-w-[250px] p-4 rounded-xl glass"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">{column.title}</h3>
      <Badge variant={column.id === "done" ? "default" : "secondary"}>
        {column.issues.length}
      </Badge>
    </div>
    <div className="space-y-3">
      {column.issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  </motion.div>
);

export default function SprintBoard() {
  const [columns] = useState<Column[]>(initialColumns);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-between items-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Sprint Board</h1>
          <p className="text-muted-foreground">Drag and drop issues to manage workflow</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Issue</span>
        </motion.button>
      </motion.div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <ColumnComponent key={column.id} column={column} />
        ))}
      </div>
    </motion.div>
  );
}