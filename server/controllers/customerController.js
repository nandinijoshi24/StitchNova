const prisma = require("../config/prismaClient");

// Add Customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, phone, email, address, gender } = req.body;

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        address,
        gender,
      },
    });

    res.status(201).json({
      success: true,
      message: "Customer added successfully",
      data: customer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Customer By ID
exports.getCustomerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const customer = await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      data: customer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Customer
// Update Customer
exports.updateCustomer = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, phone, email, address, gender } = req.body;

    const customer = await prisma.customer.update({
      where: {
        id: id,
      },
      data: {
        name,
        phone,
        email,
        address,
        gender,
      },
    });

    res.json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Customer
exports.deleteCustomer = async (req, res) => {
  res.json({
    success: true,
    message: "Customer Deleted"
  });
};