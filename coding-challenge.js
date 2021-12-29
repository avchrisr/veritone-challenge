/*

The Challenge
Your company needs you to implement a Binary Search Tree (BST), using the language
of your choice. Your solution will be utilized by several different teams throughout your
organization. Initially, this BST only needs to support integers.

Requirements
- The BST must be built from an array of integers
- Implement a method that returns the deepest nodes in the BST along with their
depth
- Implement any supporting methods needed for the solution to be useable by different teams throughout the organization

Example:
Input: 12,11,90,82,7,9
Output: deepest, 9; depth, 3

Input: 26, 82, 16, 92, 33
Output: deepest, 33, 92; depth, 2

What we are looking for
1. Correctness - will your solution produce the desired results
2. Conciseness - does your solution balance clarity and brevity
3. Maintainability - does your code stand up to changing needs
4. Anti-patterns - does your solution avoid anti-patterns

How to submit
Please create a Github repo and share the repo with your Veritone contact.

What to expect
After you submit your work, our team will review it. If the solution matches what we are
looking for, we will schedule a time to discuss the solution with you. During this time we
will ask you to share your screen and potentially do some modifications.

*/

/*

Intuition
- init root = null
- insert each value into BST        O(nlogn)  n = number of values in input
  - keep track of the depth as we insert, and store the deepest level nodes in an array
- return the deepest depth level nodes

Time:   O(nlogn)    n = number of values in input
Space:  O(n)        n = number of values (nodes) in tree

*/

class TreeNode {
    constructor(value, depth) {
        this.value = value
        this.left = null
        this.right = null
        this.depth = depth
    }
}

function findDeepestNodesAndDepth_RecursiveSolution(input = []) {
    if (input.length === 0) {
        return null
    }

    let deepestDepth = 0
    let deepestNodes = []

    let root = null

    for (let num of input) {
        root = insert(root, num, 0)
    }

    return {
        deepest: deepestNodes.sort((a, b) => a - b),
        depth: deepestDepth
    }


    function insert(node, value, depth) {
        if (node === null) {
            node = new TreeNode(value, depth)

            if (deepestDepth === depth) {
                deepestNodes.push(node.value)
            } else if (deepestDepth < depth) {
                deepestDepth = depth
                deepestNodes = [value]
            }

            return node
        }

        // TODO: Q) can there be duplicates in the input array? For now, add to the left child if duplicate value is found.
        if (node.value < value) {
            // go right
            node.right = insert(node.right, value, depth + 1)
        } else {
            // go left
            node.left = insert(node.left, value, depth + 1)
        }

        return node
    }
}

function findDeepestNodesAndDepth_IterativeSolution(input = []) {
    if (input.length === 0) {
        return null
    }

    let deepestDepth = 0
    let deepestNodes = []

    let root = null

    for (let num of input) {
        let curr = root
        let depth = 0

        if (root === null) {
            root = new TreeNode(num, depth)
            checkCurrentLevel(depth, num)
            continue
        }

        while (curr !== null) {
            depth += 1

            if (curr.value < num) {
                // go right
                if (curr.right === null) {
                    curr.right = new TreeNode(num, depth)
                    checkCurrentLevel(depth, num)
                    break
                } else {
                    curr = curr.right
                }
            } else {
                // go left
                if (curr.left === null) {
                    curr.left = new TreeNode(num, depth)
                    checkCurrentLevel(depth, num)
                    break
                } else {
                    curr = curr.left
                }
            }
        }
    }

    return {
        deepest: deepestNodes.sort((a, b) => a - b),
        depth: deepestDepth
    }


    function checkCurrentLevel(depth, value) {
        if (deepestDepth === depth) {
            deepestNodes.push(value)
        } else if (deepestDepth < depth) {
            deepestDepth = depth
            deepestNodes = [value]
        }
    }
}


// ---------
// TEST
// ---------
let input = [12, 11, 90, 82, 7, 9]
console.log(findDeepestNodesAndDepth_RecursiveSolution(input))     //  { deepest: [9], depth: 3 }
console.log(findDeepestNodesAndDepth_IterativeSolution(input))     //  { deepest: [9], depth: 3 }

input = [26, 82, 16, 92, 33]
console.log(findDeepestNodesAndDepth_RecursiveSolution(input))     //  { deepest: [33, 92], depth: 2 }
console.log(findDeepestNodesAndDepth_IterativeSolution(input))     //  { deepest: [33, 92], depth: 2 }
