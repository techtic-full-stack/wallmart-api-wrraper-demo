/**
 * @swagger
 * /auth/token:
 *   get:
 *     summary: Get authentication token
 *     tags:
 *       - Token
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-api-secret
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 */

/**
 * @swagger
 * /walmart/sync-order:
 *   get:
 *     summary: Manually sync orders from Walmart
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders synced successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: Synced 2 orders.
 */

/**
 * @swagger
 * /walmart/rates:
 *   post:
 *     summary: Retrieve shipping cost estimates
 *     description: This API retrieves shipping cost estimates for available shipping services based on address and package (e.g., customer address, packaged weight).
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boxDimensions:
 *                 type: object
 *                 properties:
 *                   boxWeightUnit:
 *                     type: string
 *                     example: "LB"
 *                   boxLength:
 *                     type: number
 *                     example: 6
 *                   boxWidth:
 *                     type: number
 *                     example: 6
 *                   boxHeight:
 *                     type: number
 *                     example: 6
 *                   boxWeight:
 *                     type: number
 *                     example: 0.8
 *                   boxDimensionUnit:
 *                     type: string
 *                     example: "IN"
 *               fromAddress:
 *                 type: object
 *                 properties:
 *                   postalCode:
 *                     type: string
 *                     example: "91776"
 *                   countryCode:
 *                     type: string
 *                     example: "US"
 *                   addressLines:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["311 E VALLEY BLVD STE 112 PMB 271as"]
 *                   city:
 *                     type: string
 *                     example: "SAN GABRIEL1as"
 *                   state:
 *                     type: string
 *                     example: "CA"
 *               toAddress:
 *                 type: object
 *                 properties:
 *                   postalCode:
 *                     type: string
 *                     example: "94085"
 *                   countryCode:
 *                     type: string
 *                     example: "US"
 *                   city:
 *                     type: string
 *                     example: "SUNNYVALE"
 *                   state:
 *                     type: string
 *                     example: "CA"
 *                   addressLines:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["748 N Mathilda Ave"]
 *               packageType:
 *                 type: string
 *                 example: "CUSTOM_PACKAGE"
 *               shipByDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-29T08:00:00.000Z"
 *               deliverByDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-05T23:00:00.000Z"
 *     responses:
 *       200:
 *         description: Shipping rates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Shipping rates fetched successfully."
 *                 rates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "SMART_POST"
 *                       displayName:
 *                         type: string
 *                         example: "FedEx Ground Economy"
 *                       deliveryDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-07T10:34:33Z"
 *                       estimatedRate:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                             example: 14.69
 *                           currency:
 *                             type: string
 *                             example: "USD"
 *                       serviceTypeGroupName:
 *                         type: string
 *                         example: "FEDEX_GROUND"
 *                       serviceTypeGroupDisplayName:
 *                         type: string
 *                         example: "FedEx Ground"
 *                       isDeliveryPromiseFulfilled:
 *                         type: boolean
 *                         example: false
 *                       carrierName:
 *                         type: string
 *                         example: "FedEx"
 *                       carrierDisplayName:
 *                         type: string
 *                         example: "FedEx"
 *                 alertMessage:
 *                   type: string
 *                   example: "No alert message provided."
 */

/**
 * @swagger
 * /walmart/create-label:
 *   post:
 *     summary: Generate shipping labels
 *     description: This API generates shipping labels with the shipment info passed. The response to a successful call contains the tracking number with the pdf or image type based on the media type passed in the Accept header. For example, 'Accept'='application/json,application/pdf' will result in pdf media type, 'Accept'='application/json,image/png' as image png media type and 'Accept'='application/json' as json response. Refer request sample1 for United-States(US) to United-States(US) shipping. Refer request sample2 for United-States(US) to United-States(US) shipping with addons. Refer request sample3 for China(CN) to United-States(US) shipping. Refer request sample4 for BYOA.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boxDimensions:
 *                 type: object
 *                 properties:
 *                   boxWeightUnit:
 *                     type: string
 *                     example: "LB"
 *                   boxWeight:
 *                     type: number
 *                     example: 13
 *                   boxDimensionUnit:
 *                     type: string
 *                     example: "IN"
 *                   boxWidth:
 *                     type: number
 *                     example: 9
 *                   boxLength:
 *                     type: number
 *                     example: 13
 *               fromAddress:
 *                 type: object
 *                 properties:
 *                   contactName:
 *                     type: string
 *                     example: "Test Seller"
 *                   companyName:
 *                     type: string
 *                     example: "Test Company"
 *                   addressLine1:
 *                     type: string
 *                     example: "Add1"
 *                   city:
 *                     type: string
 *                     example: "Anchorage"
 *                   state:
 *                     type: string
 *                     example: "AK"
 *                   postalCode:
 *                     type: string
 *                     example: "99501"
 *                   country:
 *                     type: string
 *                     example: "US"
 *                   phone:
 *                     type: string
 *                     example: "12253"
 *               carrierServiceType:
 *                 type: string
 *                 example: "FEDEX_2_DAY"
 *               carrierName:
 *                 type: string
 *                 example: "FedEx"
 *               purchaseOrderId:
 *                 type: string
 *                 example: "97108719025934786"
 *               boxItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sku:
 *                       type: string
 *                       example: "PRECISE3PGLASS9"
 *                     quantity:
 *                       type: number
 *                       example: 1
 *                     lineNumber:
 *                       type: string
 *                       example: "1"
 *               packageType:
 *                 type: string
 *                 example: "CUSTOM_PACKAGE"
 *     responses:
 *       200:
 *         description: Shipping label generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Shipping label created successfully."
 *                     labelData:
 *                       type: object
 *                       properties:
 *                         data:
 *                           type: object
 *                           properties:
 *                             purchaseOrderId:
 *                               type: string
 *                               example: "97108719025934786"
 *                             trackingNo:
 *                               type: string
 *                               example: "019154094082"
 *                             boxItems:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   sku:
 *                                     type: string
 *                                     example: "PRECISE3PGLASS9"
 *                                   quantity:
 *                                     type: number
 *                                     example: 1
 *                                   lineNumber:
 *                                     type: string
 *                                     example: "1"
 *                             carrierName:
 *                               type: string
 *                               example: "FedEx"
 *                             carrierFullName:
 *                               type: string
 *                               example: "FedEx"
 *                             carrierServiceType:
 *                               type: string
 *                               example: "FEDEX_2_DAY"
 *                             trackingUrl:
 *                               type: string
 *                               example: ""
 */

/**
 * @swagger
 * /walmart/mark-shipped/{purchaseOrderId}:
 *   post:
 *     summary: Update order lines to Shipped and trigger customer charge
 *     description: Updates the status of order lines to Shipped and triggers the charge to the customer. The response to a successful call contains the order with the shipped line items.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: purchaseOrderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "108816631915371"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderLines:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     lineNumber:
 *                       type: string
 *                       example: "1"
 *                     orderLineStatuses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           status:
 *                             type: string
 *                             example: "Shipped"
 *                           statusQuantity:
 *                             type: object
 *                             properties:
 *                               unitOfMeasurement:
 *                                 type: string
 *                                 example: "EACH"
 *                               amount:
 *                                 type: number
 *                                 example: 1
 *                           trackingInfo:
 *                             type: object
 *                             properties:
 *                               shipDateTime:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2025-05-07T16:30:00Z"
 *                               carrierName:
 *                                 type: object
 *                                 properties:
 *                                   carrier:
 *                                     type: string
 *                                     example: "FedEx"
 *                               methodCode:
 *                                 type: string
 *                                 example: "Standard"
 *                               trackingNumber:
 *                                 type: string
 *                                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Order lines updated to Shipped successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */