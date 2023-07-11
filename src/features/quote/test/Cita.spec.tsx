import { screen, waitFor } from "@testing-library/react";
import Cita from "../Cita";
import { render } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { API_URL } from "../../../app/constants";

const data = [
    {
        query: "Apu",
        data: {
            "quote": "By chilling my loins I increase the chances of impregnating my wife.",
            "character": "Apu Nahasapeemapetilon",
            "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FApuNahasapeemapetilon.png?1497567511629",
            "characterDirection": "Left"
        }
    },
    {
        query: "Milhouse",
        data: {
            "quote": "Remember the time he ate my goldfish? And you lied and said I never had a goldfish. Then why did I have the bowl, Bart? Why did I have the bowl?",
            "character": "Milhouse Van Houten",
            "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMilhouseVanHouten.png?1497567513002",
            "characterDirection": "Right"
        }
    }
]

const validQueries = data.map((q) => q.query);

const handlers = [
    rest.get(`${API_URL}`, (req, res, ctx) => {
        const character = req.url.searchParams.get("character");

        if (character === null) {
            return res(ctx.json([data[1].data]), ctx.delay(150));
        }

        if (validQueries.includes(character)) {
            const quote = data.find((q) => q.query === character);
            return res(ctx.json([quote?.data]));
        }

        return res(ctx.json([]), ctx.delay(150));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Citas', () => {
    describe('Al renderizar la página inicial', () => {
        it('El mensaje de texto del estado de las citas debe existir', async () => {
            render(<Cita />);
            expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
        });
        it('El input de texto del autor debe estar vacío', async () => {
            render(<Cita />);
            expect(screen.getByRole('textbox', { name: /Author Cita/i })).toHaveValue('');
        });
        it('El botón para obtener cita debe estar habilitado', async () => {
            render(<Cita />);
            expect(screen.getByRole('button', { name: /Obtener cita aleatoria/i })).toBeEnabled();
        });
        it('El botón para borrar una cita debe estar habilitado', async () => {
            render(<Cita />);
            expect(screen.getByRole('button', { name: /Borrar/i })).toBeEnabled();
        });
    })

    describe('Al solicitar una cita', () => {
        it("El mensaje de texto del estado de las citas debe ser CARGANDO", async () => {
            render(<Cita />);
            const botonSolicitarCita = screen.getByRole('button', { name: /Obtener cita aleatoria/i });
            userEvent.click(botonSolicitarCita);
            await waitFor(() => {
                expect(screen.getByText(/CARGANDO/i)).toBeInTheDocument()
            })

        })
    })

    describe('Al solicitar una cita aleatoria', () => {
        it("El mensaje del autor de la cita debe ser Milhouse Van Houten", async () => {
            render(<Cita />);
            const botonSolicitarCita = screen.getByRole('button', { name: /Obtener cita aleatoria/i });
            await userEvent.click(botonSolicitarCita);
            await waitFor(() => {
                expect(screen.getByText(/Milhouse Van Houten/i)).toBeInTheDocument();
            })
        })
        it("El mensaje del texto del estado debe ser la información de la cita de Milhouse Van Houten", async () => {
            render(<Cita />);
            const botonSolicitarCita = screen.getByRole('button', { name: /Obtener cita aleatoria/i });
            await userEvent.click(botonSolicitarCita);
            await waitFor(() => {
                expect(screen.getByText(data[1].data.quote)).toBeInTheDocument();
            })
        })
    })

    describe('Al solicitar una cita con Apu', () => {
        it("El mensaje del autor de la cita debe ser Apu Nahasapeemapetilon", async () => {
            render(<Cita />);
            const input = screen.getByRole('textbox', { name: 'Author Cita' });
            userEvent.click(input);
            await userEvent.type(input, "Apu")
            const botonSolicitarCita = screen.getByRole('button', { name: /Obtener Cita/i });
            await userEvent.click(botonSolicitarCita);
            await waitFor(() => {
                expect(screen.getByText(/Apu Nahasapeemapetilon/i)).toBeInTheDocument();
            })
        })
        it("El mensaje del texto del estado debe ser la información de la cita de APU", async () => {
            render(<Cita />);
            const input = screen.getByRole('textbox', { name: 'Author Cita' });
            await userEvent.click(input);
            await userEvent.type(input, "Apu");
            const botonSolicitarCita = screen.getByRole('button', { name: /Obtener Cita/i });
            await userEvent.click(botonSolicitarCita);
            await waitFor(() => {
                expect(screen.getByText(data[0].data.quote)).toBeInTheDocument();
            })
        })
    })

    describe('Al solicitar una cita con un nombre que no existe', () => {
        it("El mensaje del texto del estado debe ser Por favor ingrese un nombre válido", async () => {
            render(<Cita />);
            const input = screen.getByRole('textbox', { name: 'Author Cita' });
            await userEvent.click(input);
            await userEvent.type(input, "Milena");
            const botonSolicitarCita = screen.getByRole('button', { name: /Obtener Cita/i });
            await userEvent.click(botonSolicitarCita);
            await waitFor(() => {
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument();
            })
        })
    })

    describe('Al solicitar una cita con un valor númerico', () => {
        it("El mensaje del texto del estado debe ser Por favor ingrese un nombre válido", async () => {
            render(<Cita />);
            const input = screen.getByRole('textbox', { name: 'Author Cita' });
            await userEvent.click(input);
            await userEvent.type(input, "123456");
            const botonSolicitarCita = screen.getByRole('button', { name: /Obtener Cita/i });
            await userEvent.click(botonSolicitarCita);
            await waitFor(() => {
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument();
            })
        })
    })

    describe("Al borrar la información del formulario", () => {
        it('El mensaje de texto del estado de las citas debe existir', async () => {
            render(<Cita />);
            const botonSolicitarCita = await screen.findByText(/Obtener cita aleatoria/i);
            await userEvent.click(botonSolicitarCita);
            const buttonBorrar = await screen.findByLabelText(/Borrar/i)
            await userEvent.click(buttonBorrar);
            await waitFor(() => {
                expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
            })
        });
        it('El mensaje del autor de la cita debe estar vacío', async () => {
            render(<Cita />);
            const botonSolicitarCita = await screen.findByText(/Obtener cita aleatoria/i);
            await userEvent.click(botonSolicitarCita);
            const buttonBorrar = await screen.findByLabelText(/Borrar/i)
            const personajeAleatorio = await screen.findByText(/Milhouse Van Houten/i)
            await userEvent.click(buttonBorrar);
            await waitFor(() => {
                expect(personajeAleatorio).toBeEmptyDOMElement();
            })
        });
        it('El input de texto del autor debe estar vacío', async () => {
            render(<Cita />);
            const botonSolicitarCita = await screen.findByText(/Obtener cita aleatoria/i);
            await userEvent.click(botonSolicitarCita);
            const buttonBorrar = await screen.findByLabelText(/Borrar/i)
            await userEvent.click(buttonBorrar);
            await waitFor(() => {
                expect(screen.getByRole('textbox', { name: /Author Cita/i })).toHaveValue('');
            })
        });
        it('El botón para obtener cita debe estar habilitado', async () => {
            render(<Cita />);
            const botonSolicitarCita = await screen.findByText(/Obtener cita aleatoria/i);
            await userEvent.click(botonSolicitarCita);
            const buttonBorrar = await screen.findByLabelText(/Borrar/i)
            await userEvent.click(buttonBorrar);
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /Obtener cita aleatoria/i })).toBeEnabled();
            })
        });
        it('El botón para borrar una cita debe estar habilitado', async () => {
            render(<Cita />);
            const botonSolicitarCita = await screen.findByText(/Obtener cita aleatoria/i);
            await userEvent.click(botonSolicitarCita);
            const buttonBorrar = await screen.findByLabelText(/Borrar/i)
            await userEvent.click(buttonBorrar);
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /Borrar/i })).toBeEnabled();
            })
        });
    })
})