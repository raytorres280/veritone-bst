import { Node, BinarySearchTree } from "../bst"
import { jest } from '@jest/globals'

describe("bst tests", () => {
    let bst = new BinarySearchTree()
    let bst2 = new BinarySearchTree()
    beforeEach(() => {
        bst = new BinarySearchTree([12,11,90,82,7,9])
        bst2 = new BinarySearchTree([26, 82, 16, 92, 33])
    })

    test('creates a tree with correct values', () => {        
        let result = bst2.getDeepest()
        console.log(`deepest nodes: ${result[0]?.value}, ${result[1]?.value}`)
        console.log(`depth: ${result[2]}`)
    })

    test('getDeepest returns one child when the deepest parent has 1', () => {
        const [ left, right, depth ] = bst.getDeepest()
        expect(left).toBe(null)
        expect(right).not.toBeNull()
        expect(right.value).toBe(9)
        expect(depth).toBe(3)
    })

    test('getDeepest returns both children when the deepest parent has 2', () => {
        const [ left, right, depth ] = bst2.getDeepest()
        expect(left).not.toBeNull()
        expect(right).not.toBeNull()
        expect(left.value).toBe(33)
        expect(right.value).toBe(92)
        expect(depth).toBe(2)
    })

    test('search should return only values that exist', () => {
        const doesExist = bst2.search(33)
        const doesntExist = bst2.search(44)
        expect(doesExist.value).toBe(33)
        expect(doesntExist).toBe(null)
    })

    test('remove one child without reorganizing', () => {
        const removed = bst.remove(9)
        expect(removed).not.toBeNull()

        const node = bst.search(7)
        expect(node).not.toBeNull()
        expect(node.left).toBeNull()
        expect(node.right).toBeNull()
    })

    test('remove should remove an item that exists with one child, and reorganize the pointers', () => {
        const removed = bst.remove(11)
        expect(removed).not.toBeNull()

        const node = bst.search(7)
        expect(node).not.toBeNull()
        expect(node.left).toBeNull()
        expect(node.right).not.toBeNull()
        expect(node.right.value).toBe(9)
    })

    test('remove should remove an item that exists with two children, and reorganize the pointers', () => {
        const removed = bst2.remove(82)
        expect(removed).not.toBeNull()

        const node = bst2.search(33)
        expect(node.right).toBeNull()
        expect(node.left).toBeNull()

        const newParent = bst2.search(92)
        expect(newParent.left.value).toBe(33)
        expect(newParent.right).toBeNull()
    })
})