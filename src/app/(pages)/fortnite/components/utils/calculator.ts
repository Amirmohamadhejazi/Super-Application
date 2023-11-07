export const calculator = (data: any) => {
    console.log(data);

    const convertData = {
        data: data.entries.map((itemsData: any) => {
            return {
                bundle: itemsData.bundle || false,
                banner: itemsData.banner || false,
                regularPrice: itemsData.regularPrice,
                items: itemsData.items,
                finalPrice: itemsData.finalPrice,
                DiscountStatus: itemsData.regularPrice !== itemsData.finalPrice,
                gift: itemsData.giftable,

                refund: itemsData.refundable,
                materialInstances: itemsData.newDisplayAsset.materialInstances.map(
                    (itemsMaterial: any) => itemsMaterial.images
                )
            };
        }),
        name: data.name
    };
    return convertData;
};
