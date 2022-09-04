 const handleSubmit = async ev => {
    console.log('clicked!');
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      clearCart();
      setTimeout(() => {
        history.push('/');
      }, 10000);
    }
  };

  return (
    <div>
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page...</h4>
        </article>
      ) : (
        <article>
          <h4>Hello, {myUser && myUser.name}</h4>
          <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
          <p>Test Card Number: 4242 4242 4242 4242</p>
        </article>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
      </form>
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner"></div> : 'Pay'}
        </span>
      </button>
      {/* show any erorr that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show success message on completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your{' '}
        <a href={`https://dashboard.stripe.com/test/payments`}>
          Stripe dashboard
        </a>
        . Refresh the page to pay again.
      </p>
    </div>
  );
};