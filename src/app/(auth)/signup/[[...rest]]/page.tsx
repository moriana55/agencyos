import { SignUp } from '@clerk/nextjs'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#6366F1',
            colorBackground: '#111827',
            colorText: '#ffffff',
            colorTextSecondary: 'rgba(255,255,255,0.5)',
            colorInputBackground: 'rgba(255,255,255,0.05)',
            colorInputText: '#ffffff',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
          },
          elements: {
            card: {
              background: '#111827',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            },
            headerTitle: { color: '#ffffff', fontSize: '22px', fontWeight: '700' },
            headerSubtitle: { color: 'rgba(255,255,255,0.45)' },
            formButtonPrimary: {
              background: '#6366F1',
              boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
              '&:hover': { background: '#4F46E5' },
            },
            formFieldInput: {
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ffffff',
              '&:focus': { borderColor: '#6366F1', boxShadow: '0 0 0 3px rgba(99,102,241,0.15)' },
            },
            formFieldLabel: { color: 'rgba(255,255,255,0.5)' },
            footerActionLink: { color: '#6366F1' },
            dividerLine: { background: 'rgba(255,255,255,0.08)' },
            dividerText: { color: 'rgba(255,255,255,0.3)' },
          },
        }}
      />
    </div>
  )
}
