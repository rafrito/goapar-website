// src/app/dashboard/page.tsx
'use client';

// --- React e Frameworks ---
import { useEffect, useRef, useState } from 'react';
import {
    Flex,
    Heading,
    Text,
    VStack,
    Icon,
    Tabs,
    Card,
    HStack,
    Stat,
    SimpleGrid,
    Badge,
    Box,
    Spinner,
    Alert,
} from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { Chart } from 'chart.js/auto';
import { useAuth0 } from '@auth0/auth0-react';

// --- Ícones ---
import { PiChartBar, PiCalendarCheck, PiCoins, PiTarget } from "react-icons/pi";

// --- Tipagem para os dados do Dashboard ---
interface ContasDataItem { date: string; aPagar: number; aReceber: number; }
interface EstoqueDataItem { date: string; dias: number; }
interface VendasDataItem { mes: string; faturamento: number; }
interface MetasDataItem { dataAtual: string; metaAteHoje: number; vendasAteHoje: number; metaDoDia: number; }

interface DashboardData {
    contasData: ContasDataItem[];
    estoqueData: EstoqueDataItem[];
    vendasData: VendasDataItem[];
    metasData: MetasDataItem;
}

// ============================================================================
//   SUB-COMPONENTE: Gráfico de Contas (AGORA RECEBE DADOS VIA PROPS)
// ============================================================================
function ContasChart({ data }: { data: ContasDataItem[] }) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    
    const processData = () => {
        const labels = data.map(item => item.date);
        const pagarValues = data.map(item => item.aPagar);
        const receberValues = data.map(item => item.aReceber);
        const saldoValues = data.map(item => item.aReceber - item.aPagar);
        return { labels, pagar: pagarValues, receber: receberValues, saldo: saldoValues };
    };
    const chartData = processData();

    useEffect(() => {
        if (chartRef.current && chartData) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        { type: 'line', label: 'Saldo (R$)', data: chartData.saldo, borderColor: '#FBBF24', backgroundColor: '#FBBF24', tension: 0.3, yAxisID: 'y1' },
                        { label: 'Contas a Receber (R$)', data: chartData.receber, backgroundColor: '#34D399', borderRadius: 4 },
                        { label: 'Contas a Pagar (R$)', data: chartData.pagar, backgroundColor: '#F87171', borderRadius: 4 },
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, ticks: { color: '#A0AEC0' }, grid: { color: '#4A5568' } },
                        y1: { type: 'linear', display: true, position: 'right', ticks: { color: '#FBBF24' }, grid: { drawOnChartArea: false } },
                        x: { ticks: { color: '#A0AEC0' }, grid: { color: '#4A5568' } }
                    },
                    plugins: { legend: { labels: { color: '#CBD5E0' } } }
                }
            });
            return () => chartInstance.destroy();
        }
    }, [chartData]);

    const totalReceber = chartData.receber.reduce((a, b) => a + b, 0);
    const totalPagar = chartData.pagar.reduce((a, b) => a + b, 0);
    const saldoTotal = totalReceber - totalPagar;

    return (
        <VStack w="100%" gap={6} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                <StatCard label="Total a Receber" value={(totalReceber/1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} isPositive />
                <StatCard label="Total a Pagar" value={(totalPagar/1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <StatCard label="Saldo do Período" value={(saldoTotal/1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} isPositive={saldoTotal >= 0} />
            </SimpleGrid>
            <Card.Root variant="outline" h={{ base: "300px", md: "400px" }}>
                <Card.Body><canvas ref={chartRef}></canvas></Card.Body>
            </Card.Root>
        </VStack>
    );
}

// ============================================================================
//   SUB-COMPONENTE: Gráfico de Estoque (AGORA RECEBE DADOS VIA PROPS)
// ============================================================================
function EstoqueChart({ data }: { data: EstoqueDataItem[] }) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartData = {
        labels: data.map(item => item.date),
        dias: data.map(item => item.dias),
    };

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Dias de Estoque',
                        data: chartData.dias,
                        borderColor: '#60A5FA',
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        fill: true,
                        tension: 0.4,
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: {
                        y: { ticks: { color: '#A0AEC0' }, grid: { color: '#4A5568' } },
                        x: { ticks: { color: '#A0AEC0' }, grid: { color: '#4A5568' } }
                    },
                    plugins: { legend: { labels: { color: '#CBD5E0' } } }
                }
            });
            return () => chartInstance.destroy();
        }
    }, [chartData]);

    const mediaDias = chartData.dias.reduce((a, b) => a + b, 0) / chartData.dias.length;
    const minDias = Math.min(...chartData.dias);
    const maxDias = Math.max(...chartData.dias);

    return (
        <VStack w="100%" gap={6} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                <StatCard label="Média de Dias" value={`${mediaDias.toFixed(1)} dias`} />
                <StatCard label="Menor Valor" value={`${minDias.toFixed(1)} dias`} />
                <StatCard label="Maior Valor" value={`${maxDias.toFixed(1)} dias`} />
            </SimpleGrid>
            <Card.Root variant="outline" h={{ base: "300px", md: "400px" }}>
                <Card.Body><canvas ref={chartRef}></canvas></Card.Body>
            </Card.Root>
        </VStack>
    );
}

// ============================================================================
//   SUB-COMPONENTE: Gráfico de Vendas (AGORA RECEBE DADOS VIA PROPS)
// ============================================================================
function VendasChart({ data }: { data: VendasDataItem[] }) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartData = {
        labels: data.map(item => item.mes),
        faturamento: data.map(item => item.faturamento),
    };

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Faturamento Mensal (R$)',
                        data: chartData.faturamento,
                        borderColor: '#4FD1C5',
                        backgroundColor: 'rgba(79, 209, 197, 0.2)',
                        fill: true,
                        tension: 0.4,
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: {
                        y: { ticks: { color: '#A0AEC0' }, grid: { color: '#4A5568' } },
                        x: { ticks: { color: '#A0AEC0' }, grid: { color: '#4A5568' } }
                    },
                    plugins: { 
                        legend: { display: true, labels: { color: '#CBD5E0' } },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) { label += ': '; }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
            return () => chartInstance.destroy();
        }
    }, [chartData]);

    const totalFaturamento = chartData.faturamento.reduce((a, b) => a + b, 0);
    const mediaMensal = totalFaturamento / chartData.faturamento.length;
    const melhorMes = data.reduce((prev, current) => (prev.faturamento > current.faturamento) ? prev : current);

    return (
        <VStack w="100%" gap={6} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                <StatCard label="Faturamento Total" value={totalFaturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} isPositive />
                <StatCard label="Média Mensal" value={mediaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <StatCard label="Melhor Mês" value={`${melhorMes.mes} (${melhorMes.faturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`} />
            </SimpleGrid>
            <Card.Root variant="outline" h={{ base: "300px", md: "400px" }}>
                <Card.Body><canvas ref={chartRef}></canvas></Card.Body>
            </Card.Root>
        </VStack>
    );
}

// ============================================================================
//   SUB-COMPONENTE: Visão de Metas (AGORA RECEBE DADOS VIA PROPS)
// ============================================================================
function MetasView({ data }: { data: MetasDataItem }) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    
    const { metaAteHoje, vendasAteHoje, metaDoDia, dataAtual } = data;
    const diferenca = vendasAteHoje - metaAteHoje;
    const atingidoPercent = (vendasAteHoje / metaAteHoje) * 100;
    
    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Atingido', 'Faltante'],
                    datasets: [{
                        data: [atingidoPercent > 100 ? 100 : atingidoPercent, atingidoPercent > 100 ? 0 : 100 - atingidoPercent],
                        backgroundColor: ['#34D399', '#4A5568'],
                        borderColor: '#1A202C',
                        borderWidth: 4,
                        circumference: 180,
                        rotation: -90,
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    cutout: '80%',
                }
            });
            return () => chartInstance.destroy();
        }
    }, [atingidoPercent]);

    return (
        <VStack w="100%" gap={6} align="stretch">
             <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                <StatCard label="Data de Referência" value={dataAtual} />
                <StatCard label="Meta Acumulada" value={metaAteHoje.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <StatCard label="Vendas Acumuladas" value={vendasAteHoje.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} isPositive />
                <StatCard label="Meta do Dia" value={metaDoDia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
            </SimpleGrid>
            <Card.Root variant="outline" p={6}>
                <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" gap={8}>
                    <Box position="relative" h="150px" w="300px">
                        <canvas ref={chartRef}></canvas>
                        <VStack position="absolute" top="55%" left="50%" transform="translate(-50%, -50%)" gap={0}>
                             <Text color="gray.400" fontSize="sm">Atingido</Text>
                             <Text fontSize="4xl" fontWeight="bold" color="green.300">{atingidoPercent.toFixed(1)}%</Text>
                        </VStack>
                    </Box>
                    <Stat.Root textAlign={{ base: 'center', md: 'left' }}>
                        <Stat.Label color="gray.400">Diferença (Vendas vs Meta)</Stat.Label>
                        <Stat.ValueText fontSize="4xl" color={diferenca >= 0 ? "green.300" : "red.400"}>
                            {diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Stat.ValueText>
                        <Stat.HelpText>
                            <Badge colorScheme={diferenca >= 0 ? 'green' : 'red'} variant="subtle">
                                <HStack gap={1}>
                                    {diferenca >= 0 ? <Stat.UpIndicator /> : <Stat.DownIndicator />}
                                    <Text fontSize="xs">{diferenca >= 0 ? "Acima da meta" : "Abaixo da meta"}</Text>
                                </HStack>
                            </Badge>
                        </Stat.HelpText>
                    </Stat.Root>
                </Flex>
            </Card.Root>
        </VStack>
    )
}


// ============================================================================
//   SUB-COMPONENTE: StatCard (para KPIs)
// ============================================================================
interface StatCardProps {
    label: string;
    value: string;
    isPositive?: boolean;
}
function StatCard({ label, value, isPositive }: StatCardProps) {
    const color = isPositive === false ? "red.400" : "white";
    return (
        <Card.Root variant="outline">
            <Card.Header>
                <Stat.Root>
                    <Stat.Label color="gray.400">{label}</Stat.Label>
                    <Stat.ValueText fontSize="2xl" color={color}>
                        {value}
                    </Stat.ValueText>
                    {typeof isPositive !== 'undefined' && (
                        <Badge colorScheme={isPositive ? 'green' : 'red'} variant="subtle" mt={2}>
                            <HStack gap={1}>
                                {isPositive ? <Stat.UpIndicator /> : <Stat.DownIndicator />}
                                <Text fontSize="xs">Análise do período</Text>
                            </HStack>
                        </Badge>
                    )}
                </Stat.Root>
            </Card.Header>
        </Card.Root>
    )
}


// ============================================================================
//   COMPONENTE PRINCIPAL: DashboardPage
// ============================================================================
export default function DashboardPage() {
    const MotionFlex = motion(Flex);
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: { audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE }
                });
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const response = await fetch(`${apiBaseUrl}/api/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error('Falha ao buscar dados do dashboard.');
                }
                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (err) {
                setError("Não foi possível carregar os dados do dashboard.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [getAccessTokenSilently]);

    if (isLoading) {
        return <Flex w="100%" minH="100vh" justify="center" align="center" bg="gray.900"><Spinner size="xl" /></Flex>;
    }

    if (error || !data) {
        return (
            <Flex w="100%" minH="100vh" justify="center" align="center" bg="gray.900" p={4}>
                <Alert.Root status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" borderRadius="lg" maxW="md">
                    <Alert.Indicator boxSize="40px" mr={0} />
                    <Alert.Content>
                        <Alert.Title mt={4} mb={1} fontSize="lg">Ocorreu um Erro</Alert.Title>
                        <Alert.Description>{error || "Dados não disponíveis."}</Alert.Description>
                    </Alert.Content>
                </Alert.Root>
            </Flex>
        );
    }

    return (
        <MotionFlex
            direction="column"
            w="100%"
            minH="100vh"
            bg="gray.900"
            color="white"
            p={{ base: 4, md: 8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <VStack w="100%" maxW="container.xl" mx="auto" gap={8} align="stretch">
                <Heading as="h1" size="xl">Dashboard de Gestão</Heading>

                <Tabs.Root variant="outline" colorScheme="blue" defaultValue="contas">
                    <Tabs.List mb={6}>
                        <Tabs.Trigger value="contas"><HStack><Icon as={PiCoins} /><Text>Contas</Text></HStack></Tabs.Trigger>
                        <Tabs.Trigger value="estoque"><HStack><Icon as={PiCalendarCheck} /><Text>Estoque</Text></HStack></Tabs.Trigger>
                        <Tabs.Trigger value="vendas"><HStack><Icon as={PiChartBar} /><Text>Vendas</Text></HStack></Tabs.Trigger>
                        <Tabs.Trigger value="metas"><HStack><Icon as={PiTarget} /><Text>Metas</Text></HStack></Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="contas">
                        {data.contasData ? <ContasChart data={data.contasData} /> : <Text>Dados de Contas não disponíveis.</Text>}
                    </Tabs.Content>
                    <Tabs.Content value="estoque">
                        {data.estoqueData ? <EstoqueChart data={data.estoqueData} /> : <Text>Dados de Estoque não disponíveis.</Text>}
                    </Tabs.Content>
                    <Tabs.Content value="vendas">
                        {data.vendasData ? <VendasChart data={data.vendasData} /> : <Text>Dados de Vendas não disponíveis.</Text>}
                    </Tabs.Content>
                    <Tabs.Content value="metas">
                        {data.metasData ? <MetasView data={data.metasData} /> : <Text>Dados de Metas não disponíveis.</Text>}
                    </Tabs.Content>
                </Tabs.Root>
            </VStack>
        </MotionFlex>
    );
}
