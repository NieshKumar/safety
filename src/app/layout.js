export const metadata = {
  title: 'Tourist Safety',
  description: 'Smart Tourist Safety Monitoring',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
