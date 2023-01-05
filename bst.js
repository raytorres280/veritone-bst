import { number } from "yargs";

/**
 * @class
 * @constructor
 * @public
 * @property {Node | null} left
 * @property {Node | null} right
 * @property {number} value
 */
export class Node {
    left = null;
    right = null;
    constructor(value = null) {
        this.value = value;
    }
}

export class BinarySearchTree {
    root = null;
    constructor(arr = []) {
        while (arr.length > 0) {
            this.insert(arr.shift())
        }
    }

    /**
     * 
     * @param {Node | null} currentLeft 
     * @param {Node | null} currentRight 
     * @param {number} depth 
     * @returns 
     */
    getDeepest(currentLeft = this.root.left, currentRight = this.root.right, depth = 0) {
        if (currentLeft == null && currentRight == null) return [currentLeft, currentRight, depth];

        let maxDepth = depth + 1;
        let leftDeepest = currentLeft;
        let rightDeepest = currentRight;

        if (currentLeft !== null) {
            let [left, right, leftDepth] = this.getDeepest(currentLeft.left, currentLeft.right, depth + 1);
            if (leftDepth > maxDepth) {
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

    /**
     * 
     * @param {number} value 
     * @param {Node} current 
     * @returns 
     */
    insert(value, current = this.root) {
        if (value == null) return;
        let newNode = new Node(value);
        if (this.root == null) this.root = newNode;

        else {
            while (true) {
                if (value < current.value) {
                    if (current.left == null) {
                        current.left = newNode;
                        break;
                    } else {
                        current = current.left;
                    }
                }
                else if (value > current.value) {
                    if (current.right == null) {
                        current.right = newNode;
                        break;
                    } else {
                        current = current.right;
                    }
                } else return;
            }


        }
    }

    /**
     * 
     * @param {number} value 
     * @param {Node | null} currentNode 
     * @returns {Node | null}
     */
    remove(value, currentNode = this.root) {
        if (currentNode == null) {
            return null;
        }
        if (value == currentNode.value) {
            if (currentNode.left == null && currentNode.right == null) {
                return null;
            }
            if (currentNode.left == null) {
                return currentNode.right;
            }
            if (currentNode.right == null) {
                return currentNode.left;
            }
            let tempNode = currentNode.right;
            while (tempNode.left !== null) {
                tempNode = tempNode.left;
            }
            currentNode.value = tempNode.value;
            currentNode.right = this.remove(tempNode.value, currentNode.right);
            return currentNode;
        } else if (value < currentNode.value) {
        currentNode.left = this.remove(value, currentNode.left);
        return currentNode;
        } else {
            currentNode.right = this.remove(value, currentNode.right);
        return currentNode;
        }
    }

    /**
     * 
     * @param {number} value 
     * @param {Node} currentNode 
     * @returns {Node | null}
     */
    search(value, currentNode = this.root) {
        while (currentNode !== null) {
            if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else if (value < currentNode.value) {
                currentNode = currentNode.left
            } else {
                return currentNode
            }
        }

        return currentNode
    }
}