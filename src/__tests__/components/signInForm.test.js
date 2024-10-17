import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';


describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const signIn = jest.fn().mockResolvedValue({});
      const navigate = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer signIn={signIn} navigate={navigate} />
      );
      fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password');
      fireEvent.press(getByText('Sign in'));
      await waitFor(() => {
        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn).toHaveBeenCalledWith({ username: 'testuser', password: 'password' });
      });
    });
  });
});