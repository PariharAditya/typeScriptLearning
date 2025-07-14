import "../../App.css";

export function PersonalInfoCard({
    name,
    age,
    email,
    currentDate
}: {
    name: string;
    age: number;
    email: string;
    currentDate: string;
}) {
    return (
        <div
            className="personal-info-card"
            style={{
                maxWidth: 350,
                margin: "20px auto",
                padding: 24,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                background: "#fff",
                fontFamily: "sans-serif"
            }}
        >
            <h2 style={{ marginBottom: 8, color: "#2c3e50" }}>{name}</h2>
            <hr style={{ margin: "12px 0" }} />
            <p>
                <strong>Age:</strong> {age}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <p>
                <strong>Current Date:</strong> {currentDate}
            </p>
        </div>
    );
}
