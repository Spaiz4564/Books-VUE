export default {
  template: `
        <section class="about-page">
            <h1>About Us</h1>
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus.</p>
            <p>Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ratione maiores harum consectetur explicabo cumque sed culpa eveniet, perspiciatis in accusantium nobis repellendus at velit? Molestias ipsam iure voluptatum reprehenderit.</p>
        </section>
        <nav>
                <RouterLink to="/about/team">Our team</RouterLink> |
                <RouterLink to="/about/services">Our services</RouterLink> |
            </nav>
            <hr />
            <RouterView />
    `,
}

export const AboutTeam = {
  template: `<section>
        <h3>Our team is amazing</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>
    </section>`,
}
export const AboutServices = {
  template: `<section>
        <h3>Our Services are incredible!</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>
    </section>`,
}
