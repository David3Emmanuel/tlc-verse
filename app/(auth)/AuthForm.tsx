export default function AuthForm({ action, children }: {
    action?: (formData: FormData) => void,
    children: React.ReactNode,
}) {
    return (
        <form action={action}>
            {children}
        </form>
    )
}