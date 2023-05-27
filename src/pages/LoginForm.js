export function LoginForm({ changeForm }) {
  return (
    <>
      <h2>Sign In</h2>
      <form>
        <label htmlFor="email">
          <input name="email" id="email" placeholder="E-mail" />
        </label>

        <label htmlFor="password">
          <input name="password" id="password" placeholder="Password" />
        </label>

        <button type="submit">Submit</button>
      </form>

      <hr></hr>

      <button onClick={ changeForm }> I don't have an account</button>

    </>
  );
}