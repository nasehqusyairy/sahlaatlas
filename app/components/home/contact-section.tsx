import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export function ContactSection() {
    return (
        <section
            id="contact"
            className="relative py-12 bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden"
            style={{
                // Commodity/agriculture background with a parallax effect via bg-fixed.
                backgroundImage: `url('/images/contact.jpg')`,
            }}
        >
            {/* Dark overlay to improve text legibility. */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

            <div className="container relative z-10 mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left side: contact information and main message (Slide 9). */}
                    <div className="text-white space-y-6">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold mt-2 leading-tight">
                                Get in Touch With Us
                            </h2>
                            <p className="mt-4 text-gray-200 text-lg max-w-lg leading-relaxed">
                                Let's grow together and bring the best of Indonesia to the world. Reach out to our team for inquiries and business opportunities.
                            </p>
                        </div>

                        {/* Contact details from Slide 9. */}
                        <div className="space-y-5 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary/20 text-white border border-white/10">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs">Phone / Whatsapp</p>
                                    <p className="text-base font-medium">+62 81379264406</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary/20 text-white border border-white/10">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs">Email</p>
                                    <p className="text-base font-medium">infosahlaatlas@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary/20 text-white border border-white/10">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs">Website</p>
                                    <p className="text-base font-medium">www.sahlaatlas.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary/20 text-white border border-white/10">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs">Location</p>
                                    <p className="text-base font-medium">Bekasi, Indonesia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sisi Kanan: Contact Card Form (Shadcn UI) */}
                    <div className="flex justify-center lg:justify-end">
                        <Card className="w-full shadow lg:p-12">
                            <CardHeader>
                                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                                <CardDescription>
                                    Fill out the form below and we will get back to you shortly.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none">First Name</label>
                                            <Input placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none">Last Name</label>
                                            <Input placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none">Email Address</label>
                                        <Input type="email" placeholder="john@company.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none">Subject</label>
                                        <Input placeholder="Inquiry about Coffee / Cocoa Export" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none">Message</label>
                                        <Textarea
                                            placeholder="Tell us about your requirements or questions..."
                                            className="min-h-30"
                                        />
                                    </div>

                                    <Button type="submit" size="lg" className="w-full">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    );
}