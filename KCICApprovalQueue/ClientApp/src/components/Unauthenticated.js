const Unauthenticated = (props) => {
    return (
        <div style={{ textAlign: "center", marginTop: "10vh", color: "gray" }}>
            <h4>Error</h4>
            <h5 style={{ textWeight: "lighter" }}>Sorry you are not autheniticated</h5>
            <p>You may need to log in first</p>
            <p>if you've already registered and wait for verification to finish </p>
        </div>
        );
}

export default Unauthenticated;