class Node {
    left = null;
    right = null;
    constructor(value = null) {
        this.value = value;
    }
}

class BinarySearchTree {
    root = null;
    constructor(arr = []) {
        while (arr.length > 0) {
            this.insert(arr.shift())
        }
    }

    getDeepest(currentLeft = this.root.left, currentRight = this.root.right, depth = 0) {
        if(currentLeft == null && currentRight == null) return [currentLeft, currentRight, depth];
        
        let maxDepth = depth + 1;
        let leftDeepest = currentLeft;
        let rightDeepest = currentRight;

        if (currentLeft !== null) {
            let [left, right, leftDepth] = this.getDeepest(currentLeft.left, currentLeft.right, depth + 1);
            if(leftDepth > maxDepth) {
                leftDeepest = left
                rightDeepest = right
                maxDepth = leftDepth
            }
        }
        
        if (currentRight !== null) {
            let [left, right, rightDepth] = this.getDeepest(currentRight.left, currentRight.right, depth + 1);
            if (rightDepth > maxDepth) {
                leftDeepest = left
                rightDeepest = right
                maxDepth = rightDepth
            }
        }

        return [leftDeepest, rightDeepest, maxDepth]
    }

    insert(value = null) {
        if ( value == null ) return; 
        let newNode = new Node(value);
        if ( this.root == null ) this.root = newNode;
        
        else {
            let current = this.root;

            while (true) {
                if (value < current.value) {
                    if (current.left == null) {
                        current.left = newNode;
                        break;
                    } else {
                        current = current.left;
                    }
                }
                else {
                    if (current.right == null) {
                        current.right = newNode;
                        break;
                    } else {
                        current = current.right;
                    }
                }
            }
            

        }
    }

    remove(value = null) { if ( value == null ) return; }

    search(value = null) { if ( value == null ) return; }
}

const bst = new BinarySearchTree([12,11,90,82,7,9])
console.log(bst)

let result = bst.getDeepest()

console.log(`deepest nodes: ${result[0]?.value}, ${result[1]?.value}`)
console.log(`depth: ${result[2]}`)

const bst2 = new BinarySearchTree([26, 82, 16, 92, 33])
result = bst2.getDeepest()

console.log(`deepest nodes: ${result[0]?.value}, ${result[1]?.value}`)
console.log(`depth: ${result[2]}`)