const prisma = require("../config/prismaClient");

// Add Order
exports.addOrder = async (req, res) => {
  try {
    const {
      customerId,
      garmentTypeId,
      quantity,
      deliveryDate,
      totalAmount,
      status,
    } = req.body;

    const order = await prisma.order.create({
      data: {
        customerId,
        garmentTypeId,
        quantity,
        deliveryDate: new Date(deliveryDate),
        totalAmount,
        status: status || "PENDING",
      },
    });

    res.status(201).json({
      success: true,
      message: "Order added successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        garmentType: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Order By ID
exports.getOrderById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        garmentType: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const {
      customerId,
      garmentTypeId,
      quantity,
      deliveryDate,
      totalAmount,
      status,
    } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        customerId,
        garmentTypeId,
        quantity,
        deliveryDate: new Date(deliveryDate),
        totalAmount,
        status,
      },
    });

    res.json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.order.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};