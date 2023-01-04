function search(curr: BinaryNode<number> | null, needle: number): boolean {
    // base case 1
    if (!curr) {
        return false;
    }
    // base case 2
    if (curr.value === needle) {
        return true;
    }

    if (curr.value < needle) {
        return search(curr.right, needle);
    }

    return search(curr.left, needle);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}
