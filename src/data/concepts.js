export const conceptsData = [
  {
    id: "arrays",
    title: "Arrays & Strings",
    overview: "Arrays are the most fundamental linear data structure. They store elements in contiguous memory locations, allowing for O(1) access to any element by its index.",
    sections: [
      {
        title: "Key Operations",
        content: "• Access: O(1)\n• Search: O(N) (linear search) or O(log N) (binary search on sorted arrays)\n• Insertion/Deletion: O(N) (due to shifting elements)"
      },
      {
        title: "The Two Pointers Pattern",
        content: "This pattern uses two pointers (usually `left` and `right`) to iterate through the array. It's highly effective for sorted arrays to find pairs or for reversing parts of the array in-place."
      },
      {
        title: "The Sliding Window Pattern",
        content: "This pattern involves maintaining a 'window' of elements that satisfies a certain condition. You expand the right side to include new elements and shrink the left side to maintain the condition. It converts O(N²) problems into O(N)."
      }
    ],
    examples: [
      {
        title: "Two Pointers: Reversing an Array",
        description: "Standard in-place reversal using two pointers meeting in the middle.",
        code: "function reverseArray(arr) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap\n    left++;\n    right--;\n  }\n  return arr;\n}"
      },
      {
        title: "Sliding Window: Max Sum Subarray",
        description: "Find the maximum sum of a contiguous subarray of size K.",
        code: "function maxSubarraySum(arr, k) {\n  let maxSum = 0, windowSum = 0;\n  for (let i = 0; i < k; i++) windowSum += arr[i];\n  maxSum = windowSum;\n  \n  for (let i = k; i < arr.length; i++) {\n    windowSum += arr[i] - arr[i - k]; // Slide the window\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}"
      }
    ]
  },
  {
    id: "hashing",
    title: "Hash Maps & Sets",
    overview: "Hashing is the most powerful technique for optimizing time complexity. It uses a hash function to map keys to specific indices for O(1) average time lookups.",
    sections: [
      {
        title: "When to use Hashing?",
        content: "Whenever you need to track frequencies, remember seen elements, or find pairs that satisfy a condition (like Two Sum)."
      },
      {
        title: "Set vs. Map",
        content: "• Set: Stores only unique values. Great for duplicate detection.\n• Map: Stores key-value pairs. Great for frequency counting or storing metadata about elements."
      }
    ],
    examples: [
      {
        title: "Frequency Counter Pattern",
        description: "Counting how many times each character appears in a string.",
        code: "function charFrequency(str) {\n  const freqMap = new Map();\n  for (let char of str) {\n    freqMap.set(char, (freqMap.get(char) || 0) + 1);\n  }\n  return freqMap;\n}"
      }
    ]
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    overview: "A Linked List is a linear data structure where elements are not stored contiguously. Each node contains data and a pointer to the next node.",
    sections: [
      {
        title: "Trade-offs",
        content: "• Pros: O(1) insertion and deletion at the beginning or after a known node.\n• Cons: No random access (O(N) to reach the i-th element)."
      },
      {
        title: "Common Patterns",
        content: "• Fast & Slow Pointers: Used for cycle detection (Hare & Tortoise) and finding the middle of a list.\n• Dummy Head: A fake starting node used to simplify logic when adding/removing the real head."
      }
    ],
    examples: [
      {
        title: "Reversing a Linked List",
        description: "Classic iterative approach using three pointers.",
        code: "function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr !== null) {\n    let nextTemp = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nextTemp;\n  }\n  return prev;\n}"
      }
    ]
  },
  {
    id: "trees",
    title: "Trees & Traversals",
    overview: "Trees represent hierarchical data. Binary Search Trees (BST) are specialized trees where the left child is always smaller and the right child is always larger than the parent.",
    sections: [
      {
        title: "Depth-First Search (DFS)",
        content: "Explores as deep as possible along a branch before backtracking. Typically implemented via recursion.\n• Inorder (Left, Root, Right): Returns sorted values in a BST.\n• Preorder (Root, Left, Right): Used for copying or serialization.\n• Postorder (Left, Right, Root): Used for deletion or post-processing."
      },
      {
        title: "Breadth-First Search (BFS)",
        content: "Explores level by level using a Queue. Essential for finding the shortest path in unweighted graphs or level-order tree processing."
      }
    ],
    examples: [
      {
        title: "Recursive DFS (Inorder)",
        description: "Traversing a tree in sorted order.",
        code: "function inorderTraversal(root) {\n  const result = [];\n  function traverse(node) {\n    if (!node) return;\n    traverse(node.left);\n    result.push(node.val);\n    traverse(node.right);\n  }\n  traverse(root);\n  return result;\n}"
      },
      {
        title: "Level Order Traversal (BFS)",
        description: "Traversing a tree level by level using a Queue.",
        code: "function bfs(root) {\n  if (!root) return [];\n  const queue = [root], result = [];\n  while (queue.length > 0) {\n    const node = queue.shift();\n    result.push(node.val);\n    if (node.left) queue.push(node.left);\n    if (node.right) queue.push(node.right);\n  }\n  return result;\n}"
      }
    ]
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    overview: "DP is an optimization technique that solves complex problems by breaking them into overlapping subproblems and caching their results.",
    sections: [
      {
        title: "The Two Approaches",
        content: "• Memoization (Top-Down): Recursive approach + Cache (Object/Map).\n• Tabulation (Bottom-Up): Iterative approach + Table (Array)."
      },
      {
        title: "When to use DP?",
        content: "When a problem has 'Optimal Substructure' (solution can be built from subproblems) and 'Overlapping Subproblems' (the same subproblem is solved multiple times)."
      }
    ],
    examples: [
      {
        title: "Climbing Stairs (Tabulation)",
        description: "Calculating ways to reach step N using O(N) time and O(1) space.",
        code: "function climbStairs(n) {\n  if (n <= 2) return n;\n  let first = 1, second = 2;\n  for (let i = 3; i <= n; i++) {\n    let third = first + second;\n    first = second;\n    second = third;\n  }\n  return second;\n}"
      }
    ]
  },
  {
    id: "graphs",
    title: "Graphs",
    overview: "Graphs consist of nodes (vertices) connected by edges. They can be represented using an Adjacency Matrix (2D array) or an Adjacency List (Map/Object).",
    sections: [
      {
        title: "Graph Representations",
        content: "• Adjacency List: Most common. Space efficient for sparse graphs (O(V+E)).\n• Adjacency Matrix: O(1) edge check, but O(V²) space."
      }
    ],
    examples: [
      {
        title: "DFS on a Matrix (Islands Pattern)",
        description: "Standard recursive traversal for grid-based graph problems.",
        code: "function dfs(grid, r, c) {\n  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === '0') return;\n  grid[r][c] = '0'; // Mark as visited\n  dfs(grid, r + 1, c);\n  dfs(grid, r - 1, c);\n  dfs(grid, r, c + 1);\n  dfs(grid, r, c - 1);\n}"
      }
    ]
  },
  {
    id: "big-o",
    title: "Big O Notation",
    overview: "Big O describes the worst-case time or space an algorithm takes as the input size N grows.",
    sections: [
      {
        title: "Common Complexities",
        content: "• O(1) Constant: Accessing an array element or hash map lookup.\n• O(log N) Logarithmic: Binary search.\n• O(N) Linear: A single loop through an array.\n• O(N log N) Linearithmic: Efficient sorting algorithms (Merge Sort).\n• O(N²) Quadratic: Nested loops.\n• O(2^N) Exponential: Recursive calculation of Fibonacci (unoptimized)."
      }
    ],
    examples: [
      {
        title: "Visualizing O(N²)",
        description: "A nested loop where the inner loop runs N times for every N outer iterations.",
        code: "for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    // O(N^2) total operations\n  }\n}"
      }
    ]
  }
];
