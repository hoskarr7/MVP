import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly subdominioInput = this.page.getByPlaceholder('Subdominio');
  private readonly usuarioInput = this.page.getByPlaceholder('Nombre de Usuario');
  private readonly passwordInput = this.page.getByPlaceholder('Contraseña');
  private readonly iniciarSesionButton = this.page.getByRole('button', { name: 'Iniciar sesión' });

  async completarSubdominio(subdominio: string): Promise<void> {
    await this.subdominioInput.fill(subdominio);
  }

  async completarUsuario(usuario: string): Promise<void> {
    await this.usuarioInput.fill(usuario);
  }

  async completarContrasena(contrasena: string): Promise<void> {
    await this.passwordInput.fill(contrasena);
  }

  async iniciarSesion(): Promise<void> {
    await this.iniciarSesionButton.click();
  }
}
