export const roadmapData = [
  {
    day: 1,
    title: "Arrays & Hashing I",
    theory: "Hashing allows for O(1) lookups. Master Map and Set usage to avoid O(N^2) loops.",
    questions: [
      { 
        id: "two-sum", 
        title: "Two Sum", 
        difficulty: "Easy",
        functionName: "twoSum",
        argsType: "standard",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.\n\n**Example 1:**\nInput: `nums = [2,7,11,15], target = 9` \nOutput: `[0,1]`\nExplanation: Because `nums[0] + nums[1] == 9`, we return `[0, 1]`.\n\n**Constraints:**\n- `2 <= nums.length <= 10^4` \n- `-10^9 <= nums[i] <= 10^9` \n- `-10^9 <= target <= 10^9` \n- Only one valid answer exists.",
        starterCode: "function twoSum(nums, target) {\n  // Write your code here\n}",
        hints: [
          { text: "Try using a Hash Map to store values you've seen." },
          { 
            text: "Brute: Two loops. O(N^2).",
            code: "function twoSumBrute(nums, target) {\n  for(let i=0; i<nums.length; i++){\n    for(let j=i+1; j<nums.length; j++){\n      if(nums[i]+nums[j] === target) return [i,j];\n    }\n  }\n}",
            explanation: "Checks every pair. Very slow for large inputs."
          },
          { 
            text: "Optimal: Hash Map. O(N).",
            code: "function twoSumOptimal(nums, target) {\n  const map = new Map();\n  for(let i=0; i<nums.length; i++){\n    const diff = target - nums[i];\n    if(map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n}",
            explanation: "Store value -> index. Check if complement exists in Map."
          }
        ],
        testCases: [
          { inputArgs: [[2,7,11,15], 9], expected: [0,1] },
          { inputArgs: [[3,2,4], 6], expected: [1,2] }
        ]
      },
      { 
        id: "contains-duplicate", 
        title: "Contains Duplicate", 
        difficulty: "Easy",
        functionName: "containsDuplicate",
        argsType: "standard",
        description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.\n\n**Example 1:**\nInput: `nums = [1,2,3,1]` \nOutput: `true` \n\n**Example 2:**\nInput: `nums = [1,2,3,4]` \nOutput: `false` \n\n**Constraints:**\n- `1 <= nums.length <= 10^5` \n- `-10^9 <= nums[i] <= 10^9` ",
        starterCode: "function containsDuplicate(nums) {\n  // Write your code here\n}",
        hints: [
          { text: "A Set is perfect for tracking unique elements." },
          { 
            text: "Brute: Sort and check neighbors. O(N log N).",
            code: "function containsDuplicateBrute(nums) {\n  nums.sort();\n  for(let i=0; i<nums.length-1; i++) if(nums[i]===nums[i+1]) return true;\n  return false;\n}",
            explanation: "Sorting puts duplicates together."
          },
          { 
            text: "Optimal: Use a Set. O(N).",
            code: "function containsDuplicateOptimal(nums) {\n  return new Set(nums).size !== nums.length;\n}",
            explanation: "Sets only store unique values. If size changes, duplicates existed."
          }
        ],
        testCases: [
          { inputArgs: [[1,2,3,1]], expected: true },
          { inputArgs: [[1,2,3,4]], expected: false }
        ]
      }
    ]
  },
  {
    day: 2,
    title: "Arrays & Hashing II",
    theory: "Anagrams and grouping problems rely on consistent keys (sorted strings or frequency arrays).",
    questions: [
      { 
        id: "valid-anagram", 
        title: "Valid Anagram", 
        difficulty: "Easy",
        functionName: "isAnagram",
        argsType: "standard",
        description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\n**Example 1:**\nInput: `s = \"anagram\", t = \"nagaram\"` \nOutput: `true` \n\n**Constraints:**\n- `1 <= s.length, t.length <= 5 * 10^4` \n- `s` and `t` consist of lowercase English letters.",
        starterCode: "function isAnagram(s, t) {\n  // Write your code here\n}",
        hints: [
          { text: "Check lengths first. Then count character frequencies." },
          { 
            text: "Brute: Sort both strings. O(N log N).",
            code: "function isAnagramBrute(s, t) { return s.split('').sort().join('') === t.split('').sort().join(''); }",
            explanation: "Sorted anagrams are identical."
          },
          { 
            text: "Optimal: Frequency map. O(N).",
            code: "function isAnagramOptimal(s, t) {\n  if(s.length !== t.length) return false;\n  const count = {};\n  for(let c of s) count[c] = (count[c] || 0) + 1;\n  for(let c of t) {\n    if(!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}",
            explanation: "Tally characters in s, subtract using t."
          }
        ],
        testCases: [
          { inputArgs: ["anagram", "nagaram"], expected: true },
          { inputArgs: ["rat", "car"], expected: false }
        ]
      },
      { 
        id: "group-anagrams", 
        title: "Group Anagrams", 
        difficulty: "Medium",
        functionName: "groupAnagrams",
        argsType: "standard",
        description: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\n**Example 1:**\nInput: `strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]` \nOutput: `[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]` \n\n**Constraints:**\n- `1 <= strs.length <= 10^4` \n- `0 <= strs[i].length <= 100` \n- `strs[i]` consists of lowercase English letters.",
        starterCode: "function groupAnagrams(strs) {\n  // Write your code here\n}",
        hints: [
          { text: "Use the sorted word as a key in a Hash Map." },
          { 
            text: "Optimal: Sorted string keys. O(N * K log K).",
            code: "function groupAnagramsOptimal(strs) {\n  const map = {};\n  for(let s of strs) {\n    const sorted = s.split('').sort().join('');\n    if(!map[sorted]) map[sorted] = [];\n    map[sorted].push(s);\n  }\n  return Object.values(map);\n}",
            explanation: "Anagrams share the same sorted representation."
          }
        ],
        testCases: [
          { inputArgs: [["eat","tea","tan","ate","nat","bat"]], expected: [["eat","tea","ate"],["tan","nat"],["bat"]] }
        ]
      }
    ]
  },
  {
    day: 3,
    title: "Arrays & Hashing III",
    theory: "Frequency counting combined with sorting or buckets can find Top K elements in linear time.",
    questions: [
      { 
        id: "top-k-frequent-elements", 
        title: "Top K Frequent Elements", 
        difficulty: "Medium",
        functionName: "topKFrequent",
        argsType: "standard",
        description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.\n\n**Example 1:**\nInput: `nums = [1,1,1,2,2,3], k = 2` \nOutput: `[1,2]`\n\n**Constraints:**\n- `1 <= nums.length <= 10^5` \n- `k` is in the range `[1, the number of unique elements in the array]` \n- It is guaranteed that the answer is unique.",
        starterCode: "function topKFrequent(nums, k) {\n  // Write your code here\n}",
        hints: [
          { text: "Bucket Sort is the secret to O(N) here." },
          { 
            text: "Optimal: Bucket Sort. O(N).",
            code: "function topKFrequentOptimal(nums, k) {\n  const map = {};\n  const bucket = Array.from({length: nums.length+1}, () => []);\n  for(let n of nums) map[n] = (map[n] || 0) + 1;\n  for(let [n, f] of Object.entries(map)) bucket[f].push(Number(n));\n  const res = [];\n  for(let i=bucket.length-1; i>=0 && res.length < k; i--) res.push(...bucket[i]);\n  return res.slice(0, k);\n}",
            explanation: "Use array index as frequency. Grab Top K from the end."
          }
        ],
        testCases: [
          { inputArgs: [[1,1,1,2,2,3], 2], expected: [1,2] }
        ]
      }
    ]
  },
  {
    day: 4,
    title: "Arrays & Hashing IV",
    theory: "Prefix/Suffix arrays or sequences in Sets can solve complex array problems in O(N).",
    questions: [
      { 
        id: "product-of-array-except-self", 
        title: "Product of Array Except Self", 
        difficulty: "Medium",
        functionName: "productExceptSelf",
        argsType: "standard",
        description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.\n\n**Example 1:**\nInput: `nums = [1,2,3,4]` \nOutput: `[24,12,8,6]` \n\n**Constraints:**\n- `2 <= nums.length <= 10^5` \n- `-30 <= nums[i] <= 30` ",
        starterCode: "function productExceptSelf(nums) {\n  // Write your code here\n}",
        hints: [
          { text: "Calculate prefix products, then suffix products." },
          { 
            text: "Optimal: Prefix & Suffix in one array. O(N).",
            code: "function productExceptSelfOptimal(nums) {\n  const res = new Array(nums.length).fill(1);\n  let pre = 1, suf = 1;\n  for(let i=0; i<nums.length; i++) { res[i] *= pre; pre *= nums[i]; }\n  for(let i=nums.length-1; i>=0; i--) { res[i] *= suf; suf *= nums[i]; }\n  return res;\n}",
            explanation: "Two passes: left products then right products."
          }
        ],
        testCases: [
          { inputArgs: [[1,2,3,4]], expected: [24,12,8,6] }
        ]
      },
      { 
        id: "longest-consecutive-sequence", 
        title: "Longest Consecutive Sequence", 
        difficulty: "Medium",
        functionName: "longestConsecutive",
        argsType: "standard",
        description: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in `O(n)` time.\n\n**Example 1:**\nInput: `nums = [100,4,200,1,3,2]` \nOutput: `4` \nExplanation: The longest consecutive elements sequence is `[1, 2, 3, 4]`. Therefore its length is 4.\n\n**Constraints:**\n- `0 <= nums.length <= 10^5` \n- `-10^9 <= nums[i] <= 10^9` ",
        starterCode: "function longestConsecutive(nums) {\n  // Write your code here\n}",
        hints: [
          { text: "Use a Set for O(1) lookups. Check if (num - 1) exists to find starts." },
          { 
            text: "Optimal: Set lookups. O(N).",
            code: "function longestConsecutiveOptimal(nums) {\n  const set = new Set(nums);\n  let max = 0;\n  for(let n of set) {\n    if(!set.has(n-1)) {\n      let curr = n, score = 1;\n      while(set.has(curr+1)) { curr++; score++; }\n      max = Math.max(max, score);\n    }\n  }\n  return max;\n}",
            explanation: "Only start counting if the number is the 'beginning' of a sequence."
          }
        ],
        testCases: [
          { inputArgs: [[100,4,200,1,3,2]], expected: 4 }
        ]
      }
    ]
  },
  {
    day: 5,
    title: "Binary & Bits I",
    theory: "Learn Hamming Weight and Bitwise AND tricks.",
    questions: [
      { 
        id: "number-of-1-bits", 
        title: "Number of 1 Bits", 
        difficulty: "Easy",
        functionName: "hammingWeight",
        argsType: "standard",
        description: "Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).\n\n**Example 1:**\nInput: `n = 11` (Binary: `1011`)\nOutput: `3` \n\n**Constraints:**\n- The input must be a binary string of length 32 or an unsigned integer.",
        starterCode: "function hammingWeight(n) {\n  // Write your code here\n}",
        hints: [
          { text: "n & (n - 1) removes the last set bit." },
          { 
            text: "Optimal: n & (n-1). O(1).",
            code: "function hammingWeightOptimal(n) {\n  let count = 0;\n  while(n !== 0) { n &= (n-1); count++; }\n  return count;\n}",
            explanation: "Efficiently count bits by jumping to each '1'."
          }
        ],
        testCases: [
          { inputArgs: [11], expected: 3 }
        ]
      },
      { 
        id: "counting-bits", 
        title: "Counting Bits", 
        difficulty: "Easy",
        functionName: "countBits",
        argsType: "standard",
        description: "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of 1's in the binary representation of `i`.\n\n**Example 1:**\nInput: `n = 2` \nOutput: `[0,1,1]` \n\n**Constraints:**\n- `0 <= n <= 10^5` ",
        starterCode: "function countBits(n) {\n  // Write your code here\n}",
        hints: [
          { text: "Use previous results: dp[i] = dp[i >> 1] + (i & 1)." },
          { 
            text: "Optimal: DP + Bit Shift. O(N).",
            code: "function countBitsOptimal(n) {\n  const res = new Array(n+1).fill(0);\n  for(let i=1; i<=n; i++) res[i] = res[i >> 1] + (i & 1);\n  return res;\n}",
            explanation: "The count for `i` is the count for `i/2` plus 1 if `i` is odd."
          }
        ],
        testCases: [
          { inputArgs: [2], expected: [0,1,1] }
        ]
      }
    ]
  },
  {
    day: 6,
    title: "Binary & Bits II",
    theory: "Missing numbers and arithmetic without operators.",
    questions: [
      { 
        id: "missing-number", 
        title: "Missing Number", 
        difficulty: "Easy",
        functionName: "missingNumber",
        argsType: "standard",
        description: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.\n\n**Example 1:**\nInput: `nums = [3,0,1]` \nOutput: `2` \n\n**Constraints:**\n- `n == nums.length` \n- `1 <= n <= 10^4` \n- `0 <= nums[i] <= n` \n- All numbers are unique.",
        starterCode: "function missingNumber(nums) {\n  // Write your code here\n}",
        hints: [
          { text: "XOR a number with itself is 0. XOR all indices and values." },
          { 
            text: "Optimal: XOR. O(N).",
            code: "function missingNumberOptimal(nums) {\n  let res = nums.length;\n  for(let i=0; i<nums.length; i++) res ^= i ^ nums[i];\n  return res;\n}",
            explanation: "All numbers and indices cancel out except the missing one."
          }
        ],
        testCases: [
          { inputArgs: [[3,0,1]], expected: 2 }
        ]
      }
    ]
  },
  {
    day: 7,
    title: "Two Pointers I",
    theory: "Moving inwards from ends can solve palindrome and sum problems.",
    questions: [
      { 
        id: "valid-palindrome", 
        title: "Valid Palindrome", 
        difficulty: "Easy",
        functionName: "isPalindrome",
        argsType: "standard",
        description: "A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.\n\n**Example 1:**\nInput: `s = \"A man, a plan, a canal: Panama\"` \nOutput: `true` \nExplanation: \"amanaplanacanalpanama\" is a palindrome.\n\n**Constraints:**\n- `1 <= s.length <= 2 * 10^5` \n- `s` consists only of printable ASCII characters.",
        starterCode: "function isPalindrome(s) {\n  // Write your code here\n}",
        hints: [
          { text: "Use two pointers and regex to skip non-alphanumeric chars." },
          { 
            text: "Optimal: Two Pointers. O(N).",
            code: "function isPalindromeOptimal(s) {\n  let l = 0, r = s.length-1;\n  while(l < r) {\n    if(!/[a-zA-Z0-9]/.test(s[l])) l++;\n    else if(!/[a-zA-Z0-9]/.test(s[r])) r--;\n    else if(s[l].toLowerCase() !== s[r].toLowerCase()) return false;\n    else { l++; r--; }\n  }\n  return true;\n}",
            explanation: "Standard inward pointer check."
          }
        ],
        testCases: [
          { inputArgs: ["A man, a plan, a canal: Panama"], expected: true }
        ]
      }
    ]
  },
  {
    day: 8,
    title: "Two Pointers II",
    theory: "3Sum reduces to 2Sum with a fixed element.",
    questions: [
      { 
        id: "3sum", 
        title: "3Sum", 
        difficulty: "Medium",
        functionName: "threeSum",
        argsType: "standard",
        description: "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.\n\n**Example 1:**\nInput: `nums = [-1,0,1,2,-1,-4]` \nOutput: `[[-1,-1,2],[-1,0,1]]` \n\n**Constraints:**\n- `3 <= nums.length <= 3000` \n- `-10^5 <= nums[i] <= 10^5` ",
        starterCode: "function threeSum(nums) {\n  // Write your code here\n}",
        hints: [
          { text: "Sort the array, fix one number, then use two pointers for the rest." },
          { 
            text: "Optimal: Sort + Two Pointers. O(N^2).",
            code: "function threeSumOptimal(nums) {\n  nums.sort((a,b) => a-b);\n  const res = [];\n  for(let i=0; i<nums.length; i++){\n    if(i > 0 && nums[i] === nums[i-1]) continue;\n    let l = i+1, r = nums.length-1;\n    while(l < r) {\n      const s = nums[i] + nums[l] + nums[r];\n      if(s > 0) r--;\n      else if(s < 0) l++;\n      else {\n        res.push([nums[i], nums[l], nums[r]]);\n        l++;\n        while(nums[l] === nums[l-1] && l < r) l++;\n      }\n    }\n  }\n  return res;\n}",
            explanation: "Fix `i`, find `l` and `r`. Skip duplicates to avoid duplicate triplets."
          }
        ],
        testCases: [
          { inputArgs: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] }
        ]
      }
    ]
  },
  {
    day: 9,
    title: "Sliding Window I",
    theory: "Dynamic windows handle contiguous subarrays efficiently.",
    questions: [
      { 
        id: "best-time-to-buy-and-sell-stock", 
        title: "Best Time to Buy and Sell Stock", 
        difficulty: "Easy",
        functionName: "maxProfit",
        argsType: "standard",
        description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.\n\n**Example 1:**\nInput: `prices = [7,1,5,3,6,4]` \nOutput: `5` \nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n\n**Constraints:**\n- `1 <= prices.length <= 10^5` \n- `0 <= prices[i] <= 10^4` ",
        starterCode: "function maxProfit(prices) {\n  // Write your code here\n}",
        hints: [
          { text: "Track min price so far, calculate potential profit today." },
          { 
            text: "Optimal: Single Pass. O(N).",
            code: "function maxProfitOptimal(prices) {\n  let min = Infinity, maxP = 0;\n  for(let p of prices) { min = Math.min(min, p); maxP = Math.max(maxP, p - min); }\n  return maxP;\n}",
            explanation: "Always buy low, check sell high."
          }
        ],
        testCases: [
          { inputArgs: [[7,1,5,3,6,4]], expected: 5 }
        ]
      },
      { 
        id: "longest-substring-without-repeating-characters", 
        title: "Longest Substring Without Repeating Characters", 
        difficulty: "Medium",
        functionName: "lengthOfLongestSubstring",
        argsType: "standard",
        description: "Given a string `s`, find the length of the longest substring without repeating characters.\n\n**Example 1:**\nInput: `s = \"abcabcbb\"` \nOutput: `3` \nExplanation: The answer is \"abc\", with the length of 3.\n\n**Constraints:**\n- `0 <= s.length <= 5 * 10^4` \n- `s` consists of English letters, digits, symbols and spaces.",
        starterCode: "function lengthOfLongestSubstring(s) {\n  // Write your code here\n}",
        hints: [
          { text: "Use a Set and a sliding window. Shrink window when duplicate appears." },
          { 
            text: "Optimal: Sliding Window + Set. O(N).",
            code: "function lengthOfLongestSubstringOptimal(s) {\n  const set = new Set();\n  let l = 0, max = 0;\n  for(let r=0; r<s.length; r++){\n    while(set.has(s[r])) { set.delete(s[l]); l++; }\n    set.add(s[r]);\n    max = Math.max(max, r-l+1);\n  }\n  return max;\n}",
            explanation: "Expand right, shrink left on duplicate."
          }
        ],
        testCases: [
          { inputArgs: ["abcabcbb"], expected: 3 }
        ]
      }
    ]
  },
  {
    day: 10,
    title: "Stacks",
    theory: "Matching brackets and nested logic.",
    questions: [
      { 
        id: "valid-parentheses", 
        title: "Valid Parentheses", 
        difficulty: "Easy",
        functionName: "isValid",
        argsType: "standard",
        description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\n**Example 1:**\nInput: `s = \"()[]{}\"` \nOutput: `true` \n\n**Constraints:**\n- `1 <= s.length <= 10^4` \n- `s` consists of parentheses only `'()[]{}'`.",
        starterCode: "function isValid(s) {\n  // Write your code here\n}",
        hints: [
          { text: "Use a Stack to store opening brackets." },
          { 
            text: "Optimal: Stack. O(N).",
            code: "function isValidOptimal(s) {\n  const stack = [], map = {')':'(', '}':'{', ']':'['};\n  for(let c of s) {\n    if(map[c]) { if(stack.pop() !== map[c]) return false; }\n    else stack.push(c);\n  }\n  return stack.length === 0;\n}",
            explanation: "Match top of stack with closing bracket."
          }
        ],
        testCases: [
          { inputArgs: ["()[]{}"], expected: true }
        ]
      }
    ]
  },
  {
    day: 11,
    title: "Binary Search I",
    theory: "O(log N) efficiency on sorted or rotated data.",
    questions: [
      { 
        id: "find-minimum-in-rotated-sorted-array", 
        title: "Find Minimum in Rotated Sorted Array", 
        difficulty: "Medium",
        functionName: "findMin",
        argsType: "standard",
        description: "Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in `O(log n)` time.\n\n**Example 1:**\nInput: `nums = [3,4,5,1,2]` \nOutput: `1` \nExplanation: The original array was `[1,2,3,4,5]` rotated 3 times.\n\n**Constraints:**\n- `n == nums.length` \n- `1 <= n <= 5000` \n- `-5000 <= nums[i] <= 5000` \n- All integers in `nums` are unique.",
        starterCode: "function findMin(nums) {\n  // Write your code here\n}",
        hints: [
          { text: "Binary Search! If nums[mid] > nums[right], min is on the right." },
          { 
            text: "Optimal: Binary Search. O(log N).",
            code: "function findMinOptimal(nums) {\n  let l=0, r=nums.length-1;\n  while(l < r) {\n    let m = Math.floor((l+r)/2);\n    if(nums[m] > nums[r]) l = m+1; else r = m;\n  }\n  return nums[l];\n}",
            explanation: "Identify which half is rotated."
          }
        ],
        testCases: [
          { inputArgs: [[3,4,5,1,2]], expected: 1 }
        ]
      }
    ]
  },
  {
    day: 12,
    title: "Binary Search II",
    theory: "Search in rotated arrays requires checking which side is sorted.",
    questions: [
      { 
        id: "search-in-rotated-sorted-array", 
        title: "Search in Rotated Sorted Array", 
        difficulty: "Medium",
        functionName: "search",
        argsType: "standard",
        description: "There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index.\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.\n\n**Example 1:**\nInput: `nums = [4,5,6,7,0,1,2], target = 0` \nOutput: `4` \n\n**Constraints:**\n- `1 <= nums.length <= 5000` \n- `-10^4 <= nums[i] <= 10^4` \n- All values of `nums` are unique. ",
        starterCode: "function search(nums, target) {\n  // Write your code here\n}",
        hints: [
          { text: "One half is always sorted. Check if target lies within it." },
          { 
            text: "Optimal: Conditional Binary Search. O(log N).",
            code: "function searchOptimal(nums, target) {\n  let l=0, r=nums.length-1;\n  while(l <= r) {\n    let m = Math.floor((l+r)/2);\n    if(nums[m] === target) return m;\n    if(nums[l] <= nums[m]) {\n      if(target >= nums[l] && target < nums[m]) r = m-1; else l = m+1;\n    } else {\n      if(target > nums[m] && target <= nums[r]) l = m+1; else r = m-1;\n    }\n  }\n  return -1;\n}",
            explanation: "Determine which half is sorted to decide where to search."
          }
        ],
        testCases: [
          { inputArgs: [[4,5,6,7,0,1,2], 0], expected: 4 }
        ]
      }
    ]
  },
  {
    day: 13,
    title: "Linked Lists I",
    theory: "Pointers, pointers, pointers. Reverse and cycles.",
    questions: [
      { 
        id: "reverse-linked-list", 
        title: "Reverse Linked List", 
        difficulty: "Easy",
        functionName: "reverseList",
        argsType: "linked-list",
        description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.\n\n**Example 1:**\nInput: `head = [1,2,3,4,5]` \nOutput: `[5,4,3,2,1]` \n\n**Constraints:**\n- The number of nodes in the list is in the range `[0, 5000]` \n- `-5000 <= Node.val <= 5000` ",
        starterCode: "function reverseList(head) {\n  // Write your code here\n}",
        hints: [
          { text: "Use three pointers: prev, curr, next." },
          { 
            text: "Optimal: Iterative. O(N).",
            code: "function reverseListOptimal(head) {\n  let prev = null, curr = head;\n  while(curr) { let nxt = curr.next; curr.next = prev; prev = curr; curr = nxt; }\n  return prev;\n}",
            explanation: "Flip pointers one by one."
          }
        ],
        testCases: [
          { inputArgs: [[1,2,3]], expected: [3,2,1] }
        ]
      }
    ]
  },
  {
    day: 14,
    title: "Linked Lists II",
    theory: "Floyd's Cycle-Finding Algorithm (Tortoise and Hare).",
    questions: [
      { 
        id: "linked-list-cycle", 
        title: "Linked List Cycle", 
        difficulty: "Easy",
        functionName: "hasCycle",
        argsType: "linked-list",
        description: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.\n\nReturn `true` if there is a cycle in the linked list. Otherwise, return `false`.\n\n**Example 1:**\nInput: `head = [3,2,0,-4], pos = 1` (Cycle at pos 1)\nOutput: `true` \n\n**Constraints:**\n- The number of nodes in the list is in the range `[0, 10^4]` \n- `-10^5 <= Node.val <= 10^5` ",
        starterCode: "function hasCycle(head) {\n  // Write your code here\n}",
        hints: [
          { text: "Fast pointer moves 2x, slow pointer moves 1x. If they meet, cycle exists." },
          { 
            text: "Optimal: Slow/Fast pointers. O(N).",
            code: "function hasCycleOptimal(head) {\n  let s = head, f = head;\n  while(f && f.next) { s = s.next; f = f.next.next; if(s === f) return true; }\n  return false;\n}",
            explanation: "Hare catches Tortoise in a loop."
          }
        ],
        testCases: [
          { inputArgs: [[3,2,0,-4]], expected: false } 
        ]
      }
    ]
  },
  {
    day: 15,
    title: "Linked Lists III",
    theory: "Merging and splicing sorted nodes.",
    questions: [
      { 
        id: "merge-two-sorted-lists", 
        title: "Merge Two Sorted Lists", 
        difficulty: "Easy",
        functionName: "mergeTwoLists",
        argsType: "linked-list",
        description: "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.\n\n**Example 1:**\nInput: `list1 = [1,2,4], list2 = [1,3,4]` \nOutput: `[1,1,2,3,4,4]` \n\n**Constraints:**\n- The number of nodes in both lists is in the range `[0, 50]` \n- `-100 <= Node.val <= 100` \n- Both `list1` and `list2` are sorted in non-decreasing order.",
        starterCode: "function mergeTwoLists(list1, list2) {\n  // Write your code here\n}",
        hints: [
          { text: "Use a dummy node to simplify head management." },
          { 
            text: "Optimal: Iterative with Dummy. O(N).",
            code: "function mergeTwoListsOptimal(l1, l2) {\n  const dummy = new ListNode(); let t = dummy;\n  while(l1 && l2) { if(l1.val < l2.val){ t.next = l1; l1 = l1.next; } else { t.next = l2; l2 = l2.next; } t = t.next; }\n  t.next = l1 || l2; return dummy.next;\n}",
            explanation: "Pick smaller node, attach to tail."
          }
        ],
        testCases: [
          { inputArgs: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] }
        ]
      }
    ]
  },
  {
    day: 16,
    title: "Trees I (Basics)",
    theory: "Recursion is the natural way to handle trees.",
    questions: [
      { 
        id: "invert-binary-tree", 
        title: "Invert Binary Tree", 
        difficulty: "Easy",
        functionName: "invertTree",
        argsType: "binary-tree",
        description: "Given the `root` of a binary tree, invert the tree, and return its root.\n\n**Example 1:**\nInput: `root = [4,2,7,1,3,6,9]` \nOutput: `[4,7,2,9,6,3,1]` \n\n**Constraints:**\n- The number of nodes in the tree is in the range `[0, 100]` \n- `-100 <= Node.val <= 100` ",
        starterCode: "function invertTree(root) {\n  // Write your code here\n}",
        hints: [
          { text: "Swap root.left and root.right, then recurse." },
          { 
            text: "Optimal: Recursive DFS. O(N).",
            code: "function invertTreeOptimal(root) {\n  if(!root) return null;\n  [root.left, root.right] = [root.right, root.left];\n  invertTreeOptimal(root.left); invertTreeOptimal(root.right);\n  return root;\n}",
            explanation: "Visit every node and swap its arms."
          }
        ],
        testCases: [
          { inputArgs: [[4,2,7,1,3,6,9]], expected: [4,7,2,9,6,3,1] }
        ]
      }
    ]
  },
  {
    day: 17,
    title: "Trees II (DFS)",
    theory: "Same Tree and Subtree checks.",
    questions: [
      { 
        id: "maximum-depth-of-binary-tree", 
        title: "Maximum Depth of Binary Tree", 
        difficulty: "Easy",
        functionName: "maxDepth",
        argsType: "binary-tree",
        description: "Given the `root` of a binary tree, return its maximum depth.\n\nA binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n**Example 1:**\nInput: `root = [3,9,20,null,null,15,7]` \nOutput: `3` \n\n**Constraints:**\n- The number of nodes in the tree is in the range `[0, 10^4]` \n- `-100 <= Node.val <= 100` ",
        starterCode: "function maxDepth(root) {\n  // Write your code here\n}",
        hints: [
          { text: "Depth = 1 + Max(leftDepth, rightDepth)." },
          { 
            text: "Optimal: Recursive. O(N).",
            code: "function maxDepthOptimal(root) {\n  if(!root) return 0;\n  return 1 + Math.max(maxDepthOptimal(root.left), maxDepthOptimal(root.right));\n}",
            explanation: "Bottom-up height calculation."
          }
        ],
        testCases: [
          { inputArgs: [[3,9,20,null,null,15,7]], expected: 3 }
        ]
      }
    ]
  },
  {
    day: 18,
    title: "Trees III (BFS)",
    theory: "Level order traversal using a Queue.",
    questions: [
      { 
        id: "binary-tree-level-order-traversal", 
        title: "Binary Tree Level Order Traversal", 
        difficulty: "Medium",
        functionName: "levelOrder",
        argsType: "binary-tree",
        description: "Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).\n\n**Example 1:**\nInput: `root = [3,9,20,null,null,15,7]` \nOutput: `[[3],[9,20],[15,7]]` \n\n**Constraints:**\n- The number of nodes in the tree is in the range `[0, 2000]` \n- `-1000 <= Node.val <= 1000` ",
        starterCode: "function levelOrder(root) {\n  // Write your code here\n}",
        hints: [
          { text: "Use a Queue. Loop for current queue length to process a level." },
          { 
            text: "Optimal: BFS with Queue. O(N).",
            code: "function levelOrderOptimal(root) {\n  if(!root) return [];\n  const res = [], q = [root];\n  while(q.length) {\n    let len = q.length, level = [];\n    for(let i=0; i<len; i++){\n      let n = q.shift(); level.push(n.val);\n      if(n.left) q.push(n.left); if(n.right) q.push(n.right);\n    }\n    res.push(level);\n  }\n  return res;\n}",
            explanation: "Process nodes level by level using queue length."
          }
        ],
        testCases: [
          { inputArgs: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]] }
        ]
      }
    ]
  },
  {
    day: 19,
    title: "Trees IV (BST)",
    theory: "Binary Search Tree properties: Left < Root < Right.",
    questions: [
      { 
        id: "validate-binary-search-tree", 
        title: "Validate Binary Search Tree", 
        difficulty: "Medium",
        functionName: "isValidBST",
        argsType: "binary-tree",
        description: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA **valid BST** is defined as follows:\n- The left subtree of a node contains only nodes with keys **less than** the node's key.\n- The right subtree of a node contains only nodes with keys **greater than** the node's key.\n- Both the left and right subtrees must also be binary search trees.\n\n**Example 1:**\nInput: `root = [2,1,3]` \nOutput: `true` \n\n**Constraints:**\n- The number of nodes in the tree is in the range `[1, 10^4]` \n- `-2^31 <= Node.val <= 2^31 - 1` ",
        starterCode: "function isValidBST(root) {\n  // Write your code here\n}",
        hints: [
          { text: "Pass min and max boundaries down the recursion." },
          { 
            text: "Optimal: Recursive Range Check. O(N).",
            code: "function isValidBSTOptimal(root) {\n  function dfs(n, min, max) {\n    if(!n) return true;\n    if(n.val <= min || n.val >= max) return false;\n    return dfs(n.left, min, n.val) && dfs(n.right, n.val, max);\n  }\n  return dfs(root, -Infinity, Infinity);\n}",
            explanation: "Every node must stay within its allowed interval."
          }
        ],
        testCases: [
          { inputArgs: [[2,1,3]], expected: true }
        ]
      }
    ]
  },
  {
    day: 20,
    title: "Trees V (LCA)",
    theory: "Lowest Common Ancestor in BST.",
    questions: [
      { 
        id: "lowest-common-ancestor-of-a-binary-search-tree", 
        title: "Lowest Common Ancestor of a BST", 
        difficulty: "Easy",
        functionName: "lowestCommonAncestor",
        argsType: "binary-tree",
        description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nAccording to the definition of LCA on Wikipedia: \"The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).\"\n\n**Example 1:**\nInput: `root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8` \nOutput: `6` \n\n**Constraints:**\n- The number of nodes in the tree is in the range `[2, 10^5]` \n- `-10^9 <= Node.val <= 10^9` \n- All `Node.val` are unique. \n- `p != q` \n- `p` and `q` will exist in the BST.",
        starterCode: "function lowestCommonAncestor(root, p, q) {\n  // Write your code here\n}",
        hints: [
          { text: "If both p and q are smaller than root, LCA is on left. If larger, on right." },
          { 
            text: "Optimal: BST property. O(H).",
            code: "function lowestCommonAncestorOptimal(root, p, q) {\n  let curr = root;\n  while(curr) {\n    if(p.val < curr.val && q.val < curr.val) curr = curr.left;\n    else if(p.val > curr.val && q.val > curr.val) curr = curr.right;\n    else return curr;\n  }\n}",
            explanation: "The point where p and q 'split' is the LCA."
          }
        ],
        testCases: [
          { inputArgs: [[6,2,8,0,4,7,9,null,null,3,5], 2, 8], expected: 6 }
        ]
      }
    ]
  },
  {
    day: 21,
    title: "Matrix",
    theory: "2D Array manipulation. Spiral, rotate, and search.",
    questions: [
      { 
        id: "set-matrix-zeroes", 
        title: "Set Matrix Zeroes", 
        difficulty: "Medium",
        functionName: "setZeroes",
        argsType: "standard",
        description: "Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s. You must do it **in place**.\n\n**Example 1:**\nInput: `matrix = [[1,1,1],[1,0,1],[1,1,1]]` \nOutput: `[[1,0,1],[0,0,0],[1,0,1]]` \n\n**Constraints:**\n- `m == matrix.length` \n- `n == matrix[0].length` \n- `1 <= m, n <= 200` \n- `-2^31 <= matrix[i][j] <= 2^31 - 1` ",
        starterCode: "function setZeroes(matrix) {\n  // Write your code here\n}",
        hints: [
          { text: "Use the first row and column as markers." },
          { 
            text: "Optimal: O(1) space. O(M*N).",
            code: "function setZeroesOptimal(matrix) {\n  let r0 = false, c0 = false;\n  for(let r=0; r<matrix.length; r++) if(matrix[r][0] === 0) c0 = true;\n  for(let c=0; c<matrix[0].length; c++) if(matrix[0][c] === 0) r0 = true;\n  for(let r=1; r<matrix.length; r++){\n    for(let c=1; c<matrix[0].length; c++) if(matrix[r][c] === 0) { matrix[r][0]=0; matrix[0][c]=0; }\n  }\n  for(let r=1; r<matrix.length; r++) if(matrix[r][0]===0) matrix[r].fill(0);\n  for(let c=1; c<matrix[0].length; c++) if(matrix[0][c]===0) for(let r=1; r<matrix.length; r++) matrix[r][c]=0;\n  if(r0) matrix[0].fill(0); if(c0) for(let r=0; r<matrix.length; r++) matrix[r][0]=0;\n  return matrix;\n}",
            explanation: "Store zero flags in the matrix boundaries."
          }
        ],
        testCases: [
          { inputArgs: [[[1,1,1],[1,0,1],[1,1,1]]], expected: [[1,0,1],[0,0,0],[1,0,1]] }
        ]
      }
    ]
  },
  {
    day: 22,
    title: "Intervals I",
    theory: "Sorting intervals by start time is key.",
    questions: [
      { 
        id: "merge-intervals", 
        title: "Merge Intervals", 
        difficulty: "Medium",
        functionName: "merge",
        argsType: "standard",
        description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\n**Example 1:**\nInput: `intervals = [[1,3],[2,6],[8,10],[15,18]]` \nOutput: `[[1,6],[8,10],[15,18]]` \n\n**Constraints:**\n- `1 <= intervals.length <= 10^4` \n- `intervals[i].length == 2` \n- `0 <= start_i <= end_i <= 10^4` ",
        starterCode: "function merge(intervals) {\n  // Write your code here\n}",
        hints: [
          { text: "Sort by start time. Merge if current start <= previous end." },
          { 
            text: "Optimal: Sort + Single Pass. O(N log N).",
            code: "function mergeOptimal(intervals) {\n  intervals.sort((a,b) => a[0]-b[0]);\n  const res = [intervals[0]];\n  for(let i=1; i<intervals.length; i++){\n    let last = res[res.length-1];\n    if(intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n    else res.push(intervals[i]);\n  }\n  return res;\n}",
            explanation: "Update the end time of the last interval if overlap occurs."
          }
        ],
        testCases: [
          { inputArgs: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] }
        ]
      }
    ]
  },
  {
    day: 23,
    title: "Intervals II",
    theory: "Inserting and counting non-overlapping intervals.",
    questions: [
      { 
        id: "insert-interval", 
        title: "Insert Interval", 
        difficulty: "Medium",
        functionName: "insert",
        argsType: "standard",
        description: "You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` sorted in ascending order by `start_i`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.\n\nInsert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `start_i` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).\n\nReturn `intervals` after the insertion.\n\n**Example 1:**\nInput: `intervals = [[1,3],[6,9]], newInterval = [2,5]` \nOutput: `[[1,5],[6,9]]` \n\n**Constraints:**\n- `0 <= intervals.length <= 10^4` \n- `intervals[i].length == 2` \n- `0 <= start_i <= end_i <= 10^5` \n- `intervals` is sorted by `start_i` in ascending order.\n- `newInterval.length == 2` \n- `0 <= start <= end <= 10^5` ",
        starterCode: "function insert(intervals, newInterval) {\n  // Write your code here\n}",
        hints: [
          { text: "Three parts: Left (no overlap), Middle (merged), Right (no overlap)." },
          { 
            text: "Optimal: One Pass. O(N).",
            code: "function insertOptimal(intervals, newInterval) {\n  const res = []; let i = 0;\n  while(i < intervals.length && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);\n  while(i < intervals.length && intervals[i][0] <= newInterval[1]) {\n    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n    newInterval[1] = Math.max(newInterval[1], intervals[i++][1]);\n  }\n  res.push(newInterval);\n  while(i < intervals.length) res.push(intervals[i++]);\n  return res;\n}",
            explanation: "Merge while there is an overlap, then add everything else."
          }
        ],
        testCases: [
          { inputArgs: [[[1,3],[6,9]], [2,5]], expected: [[1,5],[6,9]] }
        ]
      }
    ]
  },
  {
    day: 24,
    title: "1-D Dynamic Programming I",
    theory: "Climbing stairs and coin change. Small steps to reach a goal.",
    questions: [
      { 
        id: "climbing-stairs", 
        title: "Climbing Stairs", 
        difficulty: "Easy",
        functionName: "climbStairs",
        argsType: "standard",
        description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?\n\n**Example 1:**\nInput: `n = 3` \nOutput: `3` \nExplanation: There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n\n**Constraints:**\n- `1 <= n <= 45` ",
        starterCode: "function climbStairs(n) {\n  // Write your code here\n}",
        hints: [
          { text: "This is Fibonacci. f(n) = f(n-1) + f(n-2)." },
          { 
            text: "Optimal: Iterative. O(N).",
            code: "function climbStairsOptimal(n) {\n  let a=1, b=1;\n  for(let i=0; i<n-1; i++) [a, b] = [a+b, a];\n  return a;\n}",
            explanation: "Only store the last two values."
          }
        ],
        testCases: [
          { inputArgs: [3], expected: 3 }
        ]
      },
      { 
        id: "coin-change", 
        title: "Coin Change", 
        difficulty: "Medium",
        functionName: "coinChange",
        argsType: "standard",
        description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.\n\n**Example 1:**\nInput: `coins = [1,2,5], amount = 11` \nOutput: `3` \nExplanation: 11 = 5 + 5 + 1\n\n**Constraints:**\n- `1 <= coins.length <= 12` \n- `1 <= coins[i] <= 2^31 - 1` \n- `0 <= amount <= 10^4` ",
        starterCode: "function coinChange(coins, amount) {\n  // Write your code here\n}",
        hints: [
          { text: "dp[i] = min(dp[i], dp[i - coin] + 1)." },
          { 
            text: "Optimal: Bottom-up DP. O(Amount * N).",
            code: "function coinChangeOptimal(coins, amount) {\n  const dp = new Array(amount+1).fill(Infinity); dp[0]=0;\n  for(let i=1; i<=amount; i++){\n    for(let c of coins) if(i-c >= 0) dp[i] = Math.min(dp[i], dp[i-c]+1);\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}",
            explanation: "Build up from 0 to amount."
          }
        ],
        testCases: [
          { inputArgs: [[1,2,5], 11], expected: 3 }
        ]
      }
    ]
  },
  {
    day: 25,
    title: "1-D Dynamic Programming II",
    theory: "House Robber and Longest Increasing Subsequence.",
    questions: [
      { 
        id: "house-robber", 
        title: "House Robber", 
        difficulty: "Medium",
        functionName: "rob",
        argsType: "standard",
        description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.\n\n**Example 1:**\nInput: `nums = [1,2,3,1]` \nOutput: `4` \nExplanation: Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount = 1 + 3 = 4.\n\n**Constraints:**\n- `1 <= nums.length <= 100` \n- `0 <= nums[i] <= 400` ",
        starterCode: "function rob(nums) {\n  // Write your code here\n}",
        hints: [
          { text: "rob = max(rob[i-1], rob[i-2] + current)." },
          { 
            text: "Optimal: Iterative DP. O(N).",
            code: "function robOptimal(nums) {\n  let r1=0, r2=0;\n  for(let n of nums) { let t = Math.max(r1 + n, r2); r1 = r2; r2 = t; }\n  return r2;\n}",
            explanation: "Keep track of max profit with and without current house."
          }
        ],
        testCases: [
          { inputArgs: [[1,2,3,1]], expected: 4 }
        ]
      }
    ]
  },
  {
    day: 26,
    title: "2-D Dynamic Programming",
    theory: "Unique Paths and Longest Common Subsequence require building a 2D table to store results of subproblems.",
    questions: [
      { 
        id: "unique-paths", 
        title: "Unique Paths", 
        difficulty: "Medium",
        functionName: "uniquePaths",
        argsType: "standard",
        description: "There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (`grid[0][0]`). The robot tries to move to the bottom-right corner (`grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.\n\nGiven the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.\n\n**Example 1:**\nInput: `m = 3, n = 7` \nOutput: `28` \n\n**Constraints:**\n- `1 <= m, n <= 100` ",
        starterCode: "function uniquePaths(m, n) {\n  // Write your code here\n}",
        hints: [
          { text: "Row-by-row DP. Current cell = cell above + cell left." },
          { 
            text: "Optimal: Row DP. O(M*N) time, O(N) space.",
            code: "function uniquePathsOptimal(m, n) {\n  let row = new Array(n).fill(1);\n  for(let i=0; i<m-1; i++){\n    let newRow = new Array(n).fill(1);\n    for(let j=n-2; j>=0; j--) newRow[j] = newRow[j+1] + row[j];\n    row = newRow;\n  }\n  return row[0];\n}",
            explanation: "Bottom-up grid traversal using only one row of space."
          }
        ],
        testCases: [
          { inputArgs: [3, 7], expected: 28 }
        ]
      }
    ]
  },
  {
    day: 27,
    title: "Dynamic Programming (Conclusion)",
    theory: "Word Break and Longest Increasing Subsequence are advanced 1D/2D DP patterns.",
    questions: [
      { 
        id: "longest-increasing-subsequence", 
        title: "Longest Increasing Subsequence", 
        difficulty: "Medium",
        functionName: "lengthOfLIS",
        argsType: "standard",
        description: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.\n\nA **subsequence** is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.\n\n**Example 1:**\nInput: `nums = [10,9,2,5,3,7,101,18]` \nOutput: `4` \nExplanation: The longest increasing subsequence is `[2,3,7,101]`.\n\n**Constraints:**\n- `1 <= nums.length <= 2500` \n- `-10^4 <= nums[i] <= 10^4` ",
        starterCode: "function lengthOfLIS(nums) {\n  // Write your code here\n}",
        hints: [
          { text: "dp[i] stores the length of the LIS ending at index i." },
          { 
            text: "Optimal: DP. O(N^2).",
            code: "function lengthOfLISOptimal(nums) {\n  const dp = new Array(nums.length).fill(1);\n  for(let i=1; i<nums.length; i++){\n    for(let j=0; j<i; j++) if(nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j]+1);\n  }\n  return Math.max(...dp);\n}",
            explanation: "For each element, check all previous elements to find the best previous subsequence to extend."
          }
        ],
        testCases: [
          { inputArgs: [[10,9,2,5,3,7,101,18]], expected: 4 }
        ]
      },
      { 
        id: "word-break", 
        title: "Word Break", 
        difficulty: "Medium",
        functionName: "wordBreak",
        argsType: "standard",
        description: "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.\n\n**Example 1:**\nInput: `s = \"leetcode\", wordDict = [\"leet\",\"code\"]` \nOutput: `true` \n\n**Constraints:**\n- `1 <= s.length <= 300` \n- `1 <= wordDict.length <= 1000` ",
        starterCode: "function wordBreak(s, wordDict) {\n  // Write your code here\n}",
        hints: [
          { text: "dp[i] is true if the prefix s[0...i] can be segmented." },
          { 
            text: "Optimal: Bottom-up DP. O(N*M).",
            code: "function wordBreakOptimal(s, wordDict) {\n  const dp = new Array(s.length+1).fill(false); dp[0]=true;\n  for(let i=0; i<=s.length; i++){\n    if(dp[i]) for(let w of wordDict) if(s.slice(i, i+w.length) === w) dp[i+w.length]=true;\n  }\n  return dp[s.length];\n}",
            explanation: "Mark reachable positions in the string using dictionary words."
          }
        ],
        testCases: [
          { inputArgs: ["leetcode", ["leet","code"]], expected: true }
        ]
      }
    ]
  },
  {
    day: 28,
    title: "Graphs I",
    theory: "Breadth-First Search (BFS) and Depth-First Search (DFS) are essential for traversing grids and adjacency lists.",
    questions: [
      { 
        id: "number-of-islands", 
        title: "Number of Islands", 
        difficulty: "Medium",
        functionName: "numIslands",
        argsType: "standard",
        description: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\n**Example 1:**\nInput: `grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]` \nOutput: `1` \n\n**Constraints:**\n- `m == grid.length`, `n == grid[i].length` \n- `1 <= m, n <= 300` ",
        starterCode: "function numIslands(grid) {\n  // Write your code here\n}",
        hints: [
          { text: "When you find a '1', use DFS to turn all connected '1's to '0's (sink the island)." },
          { 
            text: "Optimal: DFS Sink. O(M*N).",
            code: "function numIslandsOptimal(grid) {\n  let count = 0;\n  function dfs(r,c){\n    if(r<0||c<0||r>=grid.length||c>=grid[0].length||grid[r][c]==='0') return;\n    grid[r][c]='0'; dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);\n  }\n  for(let r=0; r<grid.length; r++) for(let c=0; c<grid[0].length; c++) if(grid[r][c]==='1'){ count++; dfs(r,c); }\n  return count;\n}",
            explanation: "Each DFS call completely explores and 'erases' one island."
          }
        ],
        testCases: [
          { inputArgs: [[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]], expected: 1 }
        ]
      },
      { 
        id: "pacific-atlantic-water-flow", 
        title: "Pacific Atlantic Water Flow", 
        difficulty: "Medium",
        functionName: "pacificAtlantic",
        argsType: "standard",
        description: "Find cells that can flow to both Pacific and Atlantic oceans.\n\n**Example 1:**\nInput: `heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]` \nOutput: `[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]` \n\n**Constraints:**\n- `1 <= m, n <= 200` ",
        starterCode: "function pacificAtlantic(heights) {\n  // Write your code here\n}",
        hints: [
          { text: "Start BFS/DFS from the oceans and work inland." },
          { 
            text: "Optimal: Dual DFS. O(M*N).",
            code: "function pacificAtlanticOptimal(heights) {\n  const R = heights.length, C = heights[0].length;\n  const pac = Array.from({length:R},()=>new Array(C).fill(false));\n  const atl = Array.from({length:R},()=>new Array(C).fill(false));\n  function dfs(r,c,visit,prevH){\n    if(r<0||c<0||r>=R||c>=C||visit[r][c]||heights[r][c]<prevH) return;\n    visit[r][c]=true; dfs(r+1,c,visit,heights[r][c]); dfs(r-1,c,visit,heights[r][c]); dfs(r,c+1,visit,heights[r][c]); dfs(r,c-1,visit,heights[r][c]);\n  }\n  for(let c=0; c<C; c++){ dfs(0,c,pac,heights[0][c]); dfs(R-1,c,atl,heights[R-1][c]); }\n  for(let r=0; r<R; r++){ dfs(r,0,pac,heights[r][0]); dfs(r,C-1,atl,heights[r][C-1]); }\n  const res = []; for(let r=0; r<R; r++) for(let c=0; c<C; c++) if(pac[r][c]&&atl[r][c]) res.push([r,c]);\n  return res;\n}",
            explanation: "Simulate water flowing 'uphill' from the oceans to see which cells are reachable."
          }
        ],
        testCases: [
          { inputArgs: [[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]], expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] }
        ]
      }
    ]
  },
  {
    day: 29,
    title: "Graphs II",
    theory: "Course Schedule (Topological Sort) and Cycle Detection in Directed Graphs.",
    questions: [
      { 
        id: "course-schedule", 
        title: "Course Schedule", 
        difficulty: "Medium",
        functionName: "canFinish",
        argsType: "standard",
        description: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.\n\n**Example 1:**\nInput: `numCourses = 2, prerequisites = [[1,0]]` \nOutput: `true` \n\n**Constraints:**\n- `1 <= numCourses <= 2000` \n- `0 <= prerequisites.length <= 5000` ",
        starterCode: "function canFinish(numCourses, prerequisites) {\n  // Write your code here\n}",
        hints: [
          { text: "This is cycle detection in a directed graph. A cycle means you can't finish." },
          { 
            text: "Optimal: DFS Cycle Detection. O(V+E).",
            code: "function canFinishOptimal(numCourses, prerequisites) {\n  const adj = Array.from({length: numCourses}, () => []);\n  for(let [a,b] of prerequisites) adj[a].push(b);\n  const visit = new Set(), cycle = new Set();\n  function dfs(c) {\n    if(cycle.has(c)) return false; if(visit.has(c)) return true;\n    cycle.add(c);\n    for(let pre of adj[c]) if(!dfs(pre)) return false;\n    cycle.delete(c); visit.add(c); return true;\n  }\n  for(let i=0; i<numCourses; i++) if(!dfs(i)) return false;\n  return true;\n}",
            explanation: "Use two sets: one for fully visited nodes and one for nodes in the current recursion stack (cycle detection)."
          }
        ],
        testCases: [
          { inputArgs: [2, [[1,0]]], expected: true },
          { inputArgs: [2, [[1,0],[0,1]]], expected: false }
        ]
      }
    ]
  },
  {
    day: 30,
    title: "Heaps & Tries",
    theory: "Prefix Trees (Tries) are powerful for string prefix lookups. Heaps (Priority Queues) solve top-K and merging problems.",
    questions: [
      { 
        id: "implement-trie-prefix-tree", 
        title: "Implement Trie (Prefix Tree)", 
        difficulty: "Medium",
        functionName: "Trie",
        argsType: "standard",
        description: "A **trie** (pronounced as \"try\") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\n\nImplement the Trie class:\n- `Trie()` Initializes the trie object.\n- `void insert(String word)` Inserts the string `word` into the trie.\n- `boolean search(String word)` Returns `true` if the string `word` is in the trie.\n- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`.\n\n**Example 1:**\nInput: `[\"Trie\", \"insert\", \"search\", \"startsWith\"]`, `[[], [\"apple\"], [\"apple\"], [\"app\"]]` \nOutput: `[null, null, true, true]` \n\n**Constraints:**\n- `1 <= word.length, prefix.length <= 2000` \n- `word` and `prefix` consist only of lowercase English letters.",
        starterCode: "class Trie {\n  constructor() { this.root = {}; }\n  insert(word) {\n    // Implement\n  }\n  search(word) {\n    // Implement\n  }\n  startsWith(prefix) {\n    // Implement\n  }\n}",
        hints: [
          { text: "Use nested JavaScript objects (maps) where each key is a character." },
          { 
            text: "Optimal: Trie Nodes. O(L).",
            code: "class Trie {\n  constructor() { this.root = {}; }\n  insert(word) {\n    let curr = this.root;\n    for(let c of word) { if(!curr[c]) curr[c] = {}; curr = curr[c]; }\n    curr.isEnd = true;\n  }\n  search(word) {\n    let curr = this.root;\n    for(let c of word) { if(!curr[c]) return false; curr = curr[c]; }\n    return !!curr.isEnd;\n  }\n  startsWith(prefix) {\n    let curr = this.root;\n    for(let c of prefix) { if(!curr[c]) return false; curr = curr[c]; }\n    return true;\n  }\n}",
            explanation: "Each node represents a character. `isEnd` marks the end of a valid word."
          }
        ],
        testCases: [
          { inputArgs: ["apple"], expected: true }
        ]
      }
    ]
  }
];
