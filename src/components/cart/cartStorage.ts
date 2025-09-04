export type CartItem = {
  id: string; // uuid
  kind: 'suit' | 'glove' | 'boot';
  name: string;
  price: number;
  configuration?: any;
  measurements?: any;
  sizeInfo?: any;
  createdAt: number;
};

const KEY = 'grit-cart';

function read(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export const Cart = {
  list(): CartItem[] { return read(); },
  add(item: Omit<CartItem, 'id' | 'createdAt'>): CartItem {
    const items = read();
    const newItem: CartItem = { id: crypto.randomUUID(), createdAt: Date.now(), ...item };
    items.unshift(newItem);
    write(items);
    return newItem;
  },
  remove(id: string) {
    write(read().filter(i => i.id !== id));
  },
  clear() { write([]); }
};


