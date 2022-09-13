import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export default {
    printOrders: (orders, products) => {
        const doc = new jsPDF();

        let writingY = 20;

        const totalOrderList = orders
            .flatMap(order => order.orderItems);

        const productCounts = {};
        let totalPrice = 0;

        totalOrderList.forEach(order => {
            if (!(order.productId in productCounts))
                productCounts[order.productId] = 0;

            const prod = products.find(x => x.id == parseInt(order.productId));

            productCounts[order.productId] += order.count;
            totalPrice += prod.basePrice * order.count
        });

        const totalTableBody = Object.entries(productCounts).map(order => {
            const prod = products.find(x => x.id == parseInt(order[0]));
            order[0] = prod.name;
            return order;
        });

        doc.text("RMS Orders list - Summary", 10, 10);

        autoTable(doc, {
            headStyles: { fillColor: [61, 166, 122] },
            startY: 20,
            head: [['Product', 'Amount']],
            body: totalTableBody,
        }),

        doc.setFontSize(10);
        doc.text("Total: " + totalPrice.toFixed(2)  + " Euro", 14, doc.lastAutoTable.finalY + 10);
        doc.setFontSize(18);
        

        doc.addPage();
        
        let i = 0;
        for (const order of orders) {
            const customerData = order.customerData;
            const orderItems = order.orderItems;
            doc.setFontSize(18);
            doc.text("RMS Orders list - " + customerData['name'], 10, 10);
            doc.setFontSize(10);
            
            // Customer information table
            doc.text("Customer information: ", 14, writingY);
            writingY += 2;

            autoTable(doc, {
                headStyles: { fillColor: [61, 166, 122] },
                startY: writingY,
                head: [['Key', 'Value']],
                body: Object.entries(customerData),
            }),

            writingY = doc.lastAutoTable.finalY + 10;

            // Order items table
            doc.text("Ordered items: ", 14, writingY);
            writingY += 2;
            let totalPrice = 0;

            autoTable(doc, {
                headStyles: { fillColor: [61, 166, 122] },
                startY: writingY,
                head: [['Product', 'Count', 'Price (individual)', 'Price (total)']],
                body: orderItems.map(item => {
                    const prod = products.find(x => x.id == item.productId);
                    const extraPrice = item.count * prod.basePrice;
                    totalPrice += extraPrice;

                    return [
                        prod.name,
                        item.count,
                        prod.basePrice.toFixed(2) + ' euro',
                        extraPrice.toFixed(2) + ' euro'
                    ];
                }),
            }),

            writingY = doc.lastAutoTable.finalY + 10;
            doc.text("Total price: " + totalPrice.toFixed(2) + ' euro', 14, writingY);

            writingY = doc.lastAutoTable.finalY + 10;

            if (i < orders.length - 1) {
                doc.addPage();
                writingY = 20;
                i++;
            }
        }
        
        doc.save("rms-orders.pdf");
    }
}