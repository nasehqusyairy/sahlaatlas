import { Button } from "../ui/button";

export function AboutSection() {
    return (
        <section id="about" className="py-12">
            <div className="container mx-auto px-4">
                <div className="grid lg:flex gap-4 lg:gap-8">
                    <img src="https://placehold.co/600x400" alt="about photo" />
                    <div className="grid gap-4">
                        <h2 className="text-2xl">Lorem Ipsum Dolor Sit Amet</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum in consequuntur nemo rerum sed ratione. Quos suscipit obcaecati nesciunt delectus, veritatis laudantium dicta blanditiis tempora magni? Accusantium vitae facilis eveniet?
                        </p>
                        <Button variant={'outline'}>See More</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}