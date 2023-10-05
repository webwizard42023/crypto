import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseConnectionExample {
    public static void main(String[] args) {
        // Database URL, username, and password
        String url = "jdbc:mysql://localhost:3306/your_database_name";
        String username = "username";
        String password = "password";

        // JDBC variables
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            // 1. Load the MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. Create a connection to the database
            connection = DriverManager.getConnection(url, username, password);

            // 3. Create a SQL statement
            statement = connection.createStatement();

            // 4. Execute a SQL query
            String sqlQuery = "SELECT * FROM your_table_name";
            resultSet = statement.executeQuery(sqlQuery);

            // 5. Process the result set
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                // Process other columns as needed
                System.out.println("ID: " + id + ", Name: " + name);
            }
        } catch (ClassNotFoundException e) {
            System.err.println("Error: MySQL JDBC driver not found");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Error: Failed to connect to the database");
            e.printStackTrace();
        } finally {
            // 6. Close the resources
            try {
                if (resultSet != null) resultSet.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
