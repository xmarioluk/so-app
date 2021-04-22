
function processForm()
{
    var items = document.getElementsByName("items");
    var totalWithoutTax = 0;
    var shippingPrice = 0;
    var tax = 0;

    for (i = 0; i < items.length; i++)
    {
		if (items[i].checked)
        {
            var currentItemValue = parseFloat(document.getElementById("price" + items[i].value).innerHTML, 10);
            var selectingIndex = i + 1;
	        var shippingType = document.getElementById("shipping" + selectingIndex).value;
            var selectedQuantity = document.getElementById("quantity" + selectingIndex).value;
            var taxRate = document.getElementById("taxRate" + selectingIndex).value.slice(0, -1);

            var subtotal = currentItemValue * selectedQuantity;

            totalWithoutTax += subtotal;
            tax += subtotal * (taxRate / 100);
            shippingPrice += getShippingPrice(shippingType) * selectedQuantity;
        }
    }

    document.getElementById("subtotal").innerHTML = parseFloat(totalWithoutTax).toFixed(3);
    document.getElementById("tax").innerHTML = parseFloat(tax).toFixed(3);
	document.getElementById("shipping").innerHTML = parseFloat(shippingPrice).toFixed(3);
    document.getElementById("result").innerHTML = parseFloat(totalWithoutTax + shippingPrice).toFixed(3);
}

function updateSubsidiary()
{
    var selectedSubsidiary = document.getElementById("subsidiary").value;
    var newCurrency = getCurrencyBySubsidiary(selectedSubsidiary);

    setCurrency(newCurrency);
}

function getShippingPrice(shippingType)
{
	var shippingPrice;

	switch(shippingType)
	{
		case 'FREE': shippingPrice = 19;
			break;

		case 'UPS': shippingPrice = 99;
			break;

		case 'FEDEX': shippingPrice = 119;
			break;

		case 'USPS': shippingPrice = 159;
			break;

		default: break;
	}

	return shippingPrice;
}

function updateTaxRate(taxCodeId)
{
	var taxRateId;

	switch(taxCodeId)
	{
		case 'taxCode1': taxRateId = 'taxRate1';
			break;

		case 'taxCode2': taxRateId = 'taxRate2';
			break;

		case 'taxCode3': taxRateId = 'taxRate3';

		case 'taxCode4': taxRateId = 'taxRate4';
			break;

		default: break;
	}

	var taxRateValue;
	var taxCode = document.getElementById(taxCodeId).value;
	switch(taxCode)
	{
		case 'JPYTAX': taxRateValue = '20%';
			break;

		case 'GBPTAX': taxRateValue = '17%';
			break;

		case 'AUDTAX': taxRateValue = '22%';
			break;

		case 'USDTAX': taxRateValue = '21%';
			break;

		default: break;
	}

	document.getElementById(taxRateId).value = taxRateValue;
}

function showInfoRate()
{
	var infoIsHidden = document.getElementById("infoRate").style.visibility == "hidden";
	var mainFrameHeight = "600px";
	var infoRateVisibility = "hidden";

	if (infoIsHidden) {
		mainFrameHeight = "900px";
		infoRateVisibility = "visible";
	}

	document.getElementById("infoRate").style.visibility = infoRateVisibility;
	document.getElementById("mainframe").style.height = mainFrameHeight;
}

function getCurrencyBySubsidiary(selectedSubsidiary)
{
    var newCurrency;

    switch(selectedSubsidiary)
    {
       case "JP": newCurrency = "JPY";
                  break;

       case "UK": newCurrency = "GBP";
                  break;

       case "AU": newCurrency = "AUD";
                  break;

       case "US": newCurrency = "USD";
                  break;
    }

    return newCurrency;
}

function setCurrency(newCurrency)
{
    var originalCurrency = document.getElementById("currency").value;
    document.getElementById("currency").value = newCurrency;

	document.getElementById("currencysymbol1").innerHTML = " " + newCurrency;
	document.getElementById("currencysymbol2").innerHTML = " " + newCurrency;
	document.getElementById("currencysymbol3").innerHTML = " " + newCurrency;
	document.getElementById("currencysymbol4").innerHTML = " " + newCurrency;

    updateItemPrices(originalCurrency, newCurrency);
}

function getExchangeRate(fromCurrency, toCurrency)
{
    var exchangeRateId = fromCurrency + " - " + toCurrency;
    var exchangeRate = document.getElementById(exchangeRateId).innerHTML;

    return exchangeRate;
}

function updateItemPrices(originalCurrency, newCurrency)
{
    var price1 = document.getElementById("price1").innerHTML;
    var price2 = document.getElementById("price2").innerHTML;
    var price3 = document.getElementById("price3").innerHTML;
    var price4 = document.getElementById("price4").innerHTML;

    var exchangeRate = getExchangeRate(originalCurrency, newCurrency);

    document.getElementById("price1").innerHTML = parseFloat(price1 * exchangeRate).toFixed(3);
    document.getElementById("price2").innerHTML = parseFloat(price2 * exchangeRate).toFixed(3);
    document.getElementById("price3").innerHTML = parseFloat(price3 * exchangeRate).toFixed(3);
    document.getElementById("price4").innerHTML = parseFloat(price4 * exchangeRate).toFixed(3);
}

function markAll()
{
	var markall = document.getElementById("markall").checked;
	var items = document.getElementsByName("items");

	for (i = 1; i <= items.length; i++)
	{
		items[i].checked = markall;
	}
}