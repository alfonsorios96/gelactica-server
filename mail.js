const nodemailer = require('nodemailer');

exports.sendEmail = (request, response) => {
    let payload = request.body;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'caballeros.de.polymer@gmail.com',
            pass: 'polython2017'
        }
    });

    let mailOptions = {
        from: '"Gelactica Hair 👻" <soporte@gelactica.com>',
        to: payload.email,
        subject: 'Gelactica Hair',
        html: `
            <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Pedido Gelactica Hair</title>
</head>
<body>
<table>
    <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Precio regular</th>
        <th>Envío</th>
        <th>Precio total</th>
    </tr>
    <tr>
        <td>Gelactica Gel</td>
        <td>${payload.quantity} piezas</td>
        <td>$18 USD p/pieza</td>
        <td>$3 USD</td>
        <td>$ ${payload.amount} USD</td>
    </tr>
</table>
<p>
    En caso de que su orden no llegara al domicilio o no nos comuniquemos con usted dentro de 5 días hábiles
    siéntase con la libertad de enviarnos un correo electrónico a soporte@gelactica-hair.com. Le recordamos que su pedido se paga en contra entrega.
</p>
</body>
</html>

        `
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response.status(500).send(error);
        }
        response.status(200).send(info);
    });
};
