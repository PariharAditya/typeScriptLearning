const temp = (temp: number): string => {
    if (temp > 30) {
        return "Hot";
    } else if (temp > 20) {
        return "Warm";
    } else {
        return "Cold";
    }
}


export function WeatherCard({
    city,
    temperature,
    condition,
    date
}: {
    city: string;
    temperature: number;
    condition: string;
    date: string;
}) {
    return (
        <div
            className="weather-card"
            style={{
                maxWidth: 350,
                margin: "20px auto",
                padding: 24,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                background: "#fff",
                fontFamily: "sans-serif",
                ...temp(temperature) === "Hot" ? { backgroundColor: "#ffebee" } : temp(temperature) === "Warm" ? { backgroundColor: "#fff3cd" } : { backgroundColor: "#d1ecf1" }
            }}
        >
            <h2 style={{ marginBottom: 8, color: "#2c3e50" }}>{city}</h2>
            <hr style={{ margin: "12px 0" }} />
            <p>
                <strong>Temperature:</strong> {temperature}°C
            </p>
            <p>
                <strong>Condition:</strong> {condition}
            </p>
            <p>
                <strong>Date:</strong> {date}
            </p>
        </div>
    )
}