interface ShoppingListProps {
    items: string[];
}

export function list({ items }: ShoppingListProps) {
    return (
        <div className="shopping-list-container">
            <h2 className="shopping-list-title">Shopping List</h2>
            <ul className="shopping-list-items">
                {items.map((item, index) => (
                    <li key={index} className="shopping-list-item">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}