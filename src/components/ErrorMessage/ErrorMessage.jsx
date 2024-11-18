const ErrorMessage = ({ message }) => {
  return (
    message && (
      <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
        {message}
      </div>
    )
  );
};

export default ErrorMessage;
