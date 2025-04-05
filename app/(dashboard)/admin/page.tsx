export default function AdminDashboard() {
  // Mock data for demonstration
  const stats = [
    { id: 1, name: "Total Sales", value: "$12,346.00", change: "+12%", changeType: "increase" },
    { id: 2, name: "Total Orders", value: "156", change: "+8%", changeType: "increase" },
    { id: 3, name: "New Customers", value: "32", change: "+24%", changeType: "increase" },
    { id: 4, name: "Conversion Rate", value: "3.2%", change: "-0.4%", changeType: "decrease" },
  ];

  const recentOrders = [
    { id: "#ORD-2023-1001", customer: "John Doe", date: "2023-04-01", amount: "$124.00", status: "Delivered" },
    { id: "#ORD-2023-1002", customer: "Jane Smith", date: "2023-04-02", amount: "$86.50", status: "Processing" },
    { id: "#ORD-2023-1003", customer: "Mike Johnson", date: "2023-04-02", amount: "$412.99", status: "Pending" },
    { id: "#ORD-2023-1004", customer: "Sarah Williams", date: "2023-04-03", amount: "$65.25", status: "Delivered" },
    { id: "#ORD-2023-1005", customer: "Alex Brown", date: "2023-04-03", amount: "$189.00", status: "Shipped" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            <div className="mt-2 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Pending"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t">
          <a href="/admin/orders" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all orders →
          </a>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/admin/products/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Add New Product
          </a>
          <a
            href="/admin/orders"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Manage Orders
          </a>
          <a
            href="/admin/customers"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            View Customers
          </a>
          <a
            href="/admin/settings"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
          >
            Store Settings
          </a>
        </div>
      </div>
    </div>
  );
} 