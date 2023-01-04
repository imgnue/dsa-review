type Node<T> = {
	value: T,
	next?: Node<T>,
	prev?: Node<T>,
}

export default class DoublyLinkedList<T> {
    public length: number;
		public head?: Node<T>;
		public tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item }

        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) throw new Error("index out of bounds");

        if (idx == 0) {
            this.prepend(item);
            return;
        } else if (idx == this.length) {
            this.append(item);
            return;
        }

        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr?.next;
        }

        if (!curr) throw new Error("unknown error");

        this.length++;

        const node: Node<T> = { value: item }

        if (curr.prev) {
            curr.prev.next = node;
            node.prev = curr.prev;
        }

        node.next = curr;
        curr.prev = node;
    }

    append(item: T): void {
        const node: Node<T> = { value: item }

        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        let idx = 0;
        while (curr) {
            if (curr.value === item) break;
            idx++;
            curr = curr.next;
        }

        if (!curr) return undefined;

        return this.removeAt(idx);
    }

    get(idx: number): T | undefined {
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr?.next;
        }
        
        return curr?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx > this.length) throw new Error("index out of bounds");

        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr?.next;
        }

        if (!curr) throw new Error("unknown error");

        this.length--;

        if (curr.prev) {
            curr.prev.next = curr.next;
        } else {
            this.head = curr.next;
        }

        if (curr.next) {
            curr.next.prev = curr.prev;
        } else {
            this.tail = curr.prev;
        }

        curr.next = curr.prev = undefined;
        
        return curr.value;
    }
}
