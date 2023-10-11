class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        //first, remove duplicate and sort the array
        const uniqArr = [...new Set(arr)];
        const orderedArr = uniqArr.sort((a, b) => a - b);
        //one can also remove duplicate by filter method like below:
        // orderedArr.filter ( (item, pos, arr) => {
        //      if (pos > 0 && item === arr[pos - 1]) {
        //    return false;
        //}  else {
        //    return true;
        //}
        //})
        function buildTreeHelper(arr, start, end) {
            if (start > end) return null;
            const mid = Math.floor((start + end) / 2);
            const root = new Node(arr[mid]);
            root.left = buildTreeHelper(arr, start, mid - 1);
            root.right = buildTreeHelper(arr, mid + 1, end);
            return root;
        }
        return buildTreeHelper(orderedArr, 0, orderedArr.length - 1);
    }

    insert(value) {
        //assume the insertion value is not in the tree in the first place
        function insertBST(root, value) {
            if (root === null) return new Node(value);
            if (value > root.val) {
                root.right = insertBST(root.right, value);
            } else {
                root.left = insertBST(root.left, value);
            }
            return root;
        }
        insertBST(this.root, value); 
    }

    delete(value) {
        function deleteBST(root, value) {
            if (root === null) return null;
            if (root.val > value) {
                root.left = deleteBST(root.left, value);
            } else if (root.value < value){
                root.right = deleteBST(root.right, value);
            } else {
                //we found the value, need to delete
                if (root.left === null) return root.right;
                if (root.right === null) return root.left;
                //now root has both non null children
                let node = root.left;
                while (node.right !== null) {
                    node = node.right;
                }
                node.right = root.right;
                return root.left;
            }
            return root;
        }
        deleteBST(this.root, value);
    }
    
    find(value) {
        function findBST(root, value) {
            if (root === null) return null;
            if (root.val > value) {
                //need to return the call
                return findBST(root.left, value);
            } else if (root.val < value) {
                return findBST(root.right, value);
            } else {
                //we find the node;
                return root;
            }
        }
        return findBST(this.root, value);
    }
    levelOrder(callback) {
        //use array to implement queue 
        const queue = [];
        const result = [];
        queue.push(this.root);
        while (queue.length !== 0) {
            let size = queue.length;
            const levelArr = new Array(size);
            for (let i = 0; i < size; i++) {
                let node = queue.shift();
                if (callback !== undefined) {
                    callback(node);
                }
                //using push increased the array length
                levelArr[i] = node.val;
                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
            }
            result.push(levelArr);
        }
        if (callback === undefined) {
            return result;
        }
    }
    inorder(callback) {
        const result = [];
        function inorderBST(root, callback) {
            if(root === null) return null;
            inorderBST(root.left, callback);
            if (callback !== undefined) {
                callback(root);
            } else {
                result.push(root.val);
            }
            inorderBST(root.right, callback);
        }
        inorderBST(this.root, callback);
        if (callback === undefined) {
            return result;
        }
    }
    preorder(callback) {
        const result = [];
        function preorderBST(root, callback) {
            if(root === null) return null;
            if (callback !== undefined) {
                callback(root);
            } else {
                result.push(root.val);
            }
            preorderBST(root.left, callback);
            preorderBST(root.right, callback);
        }
        preorderBST(this.root, callback);
        if (callback === undefined) {
            return result;
        }
    }
    postorder(callback) {
        const result = [];
        function postorderBST(root, callback) {
            if(root === null) return null;
            postorderBST(root.left, callback);
            postorderBST(root.right, callback);
            if (callback !== undefined) {
                callback(root);
            } else {
                result.push(root.val);
            }
        }
        postorderBST(this.root, callback);
        if (callback === undefined) {
            return result;
        }
    }

    height(value) {
        //assume this value exsit in the tree
        //find the value first
        //then calculate its height
        function treeHeight(root) {
            if (root === null) return 0;
            return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));
        }
        function findNodeHeight(root, value) {
            while (root.val !== value) {
                if (root.val > value) {
                    root = root.left;
                } else {
                    root = root.right;
                }
            }
            return treeHeight(root);
        }
        return findNodeHeight(this.root, value);

    }

    depth(value) {
        //assume this value exsit in the tree
        let step = 0;
        let node = this.root;
        while (node.val !== value) {
            if (node.val > value) {
                node = node.left;
            } else {
                node = node.right;
            }
            step++;
        }
        return step;
    }

    isBalanced() {
        function isBalancedBST(root) {
            if (root === null) return 0;
            const left = isBalancedBST(root.left);
            if (left === -1) return -1;
            const right = isBalancedBST(root.right);
            if (right === -1) return -1;
            return Math.abs(left - right) > 1 ? -1 : 1 + Math.max(left, right);
        }
        return isBalancedBST(this.root) !== -1;
    }

    rebalance() {
        //assme tree is unbalanced
        //first, use inorder() to get array, then use build tree to to get the balance tree
        const array = tree.inorder();
        this.root = this.buildTree(array);
    }
}


//generate an array with 20 random numbers[0, 99]
function randomArray() {
    const array = [];
    for (i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}
const array = randomArray();
const tree = new Tree(array);
//const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

prettyPrint(tree.root, prefix = "", isLeft = true);
console.log(tree.isBalanced());

console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());
console.log(tree.levelOrder());

//unbalance the tree by adding several numbers > 100
tree.insert(102);
tree.insert(204);
tree.insert(155);
tree.insert(300);
prettyPrint(tree.root, prefix = "", isLeft = true);
console.log(tree.isBalanced());

//rebalance the tree
tree.rebalance();
prettyPrint(tree.root, prefix = "", isLeft = true);
console.log(tree.isBalanced());
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());
console.log(tree.levelOrder());