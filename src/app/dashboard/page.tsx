// src/app/dashboard/page.tsx
'use client';

// --- React e Frameworks ---
import { useEffect, useRef } from 'react';
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
} from "@chakra-ui/react";
import { motion, Variants } from 'framer-motion';
import { Chart, ChartOptions } from 'chart.js/auto';

// --- Ícones ---
import { PiChartBar, PiChartLineUp, PiCalendarCheck, PiCoins, PiTarget } from "react-icons/pi";

// ============================================================================
//   DADOS MOCKADOS
// ============================================================================
const contasData = [
    { date: "31-Mar", aPagar: 261426, aReceber: 289335 },
    { date: "15-Abr", aPagar: 297383, aReceber: 306962 },
    { date: "02-Mai", aPagar: 238420, aReceber: 362456 },
    { date: "15-Mai", aPagar: 238975, aReceber: 420880 },
    { date: "06-Jun", aPagar: 238949, aReceber: 334376 },
    { date: "17-Jun", aPagar: 235272, aReceber: 382077 },
    { date: "04-Jul", aPagar: 222828, aReceber: 296060 }
];

const estoqueData = [
    { date: "31-Mar", dias: 153.8 },
    { date: "15-Abr", dias: 156.6 },
    { date: "02-Mai", dias: 144.9 },
    { date: "15-Mai", dias: 149.7 },
    { date: "06-Jun", dias: 136.6 },
    { date: "17-Jun", dias: 140.9 },
    { date: "04-Jul", dias: 134.3 }
];

const vendasData = [
    { mes: "Janeiro", faturamento: 281160 },
    { mes: "Fevereiro", faturamento: 408675 },
    { mes: "Março", faturamento: 383081 },
    { mes: "Abril", faturamento: 474950 },
    { mes: "Maio", faturamento: 502671 },
    { mes: "Junho", faturamento: 425346 },
    { mes: "Julho", faturamento: 457395 }
];

const metasData = {
    dataAtual: "06/Ago",
    metaAteHoje: 99842,
    vendasAteHoje: 101379,
    metaDoDia: 16756,
};


// ============================================================================
//   SUB-COMPONENTE: Gráfico de Contas
// ============================================================================
function ContasChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    
    const processData = () => {
        const labels = contasData.map(item => item.date);
        const pagarValues = contasData.map(item => item.aPagar);
        const receberValues = contasData.map(item => item.aReceber);
        const saldoValues = contasData.map(item => item.aReceber - item.aPagar);
        return { labels, pagar: pagarValues, receber: receberValues, saldo: saldoValues };
    };
    const chartData = processData();

    useEffect(() => {
        if (chartRef.current) {
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
                <StatCard label="Total a Receber" value={totalReceber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} isPositive />
                <StatCard label="Total a Pagar" value={totalPagar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <StatCard label="Saldo do Período" value={saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} isPositive={saldoTotal >= 0} />
            </SimpleGrid>
            <Card.Root variant="outline" h={{ base: "300px", md: "400px" }}>
                <Card.Body><canvas ref={chartRef}></canvas></Card.Body>
            </Card.Root>
        </VStack>
    );
}

// ============================================================================
//   SUB-COMPONENTE: Gráfico de Estoque
// ============================================================================
function EstoqueChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);

    const processData = () => {
        const labels = estoqueData.map(item => item.date);
        const diasValues = estoqueData.map(item => item.dias);
        return { labels, dias: diasValues };
    };
    const chartData = processData();

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Dias de Estoque',
                        data: chartData.dias,
                        borderColor: '#60A5FA', // Azul
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
//   SUB-COMPONENTE: Gráfico de Vendas (ATUALIZADO PARA GRÁFICO DE LINHA)
// ============================================================================
function VendasChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);

    const processData = () => {
        const labels = vendasData.map(item => item.mes);
        const faturamentoValues = vendasData.map(item => item.faturamento);
        return { labels, faturamento: faturamentoValues };
    };
    const chartData = processData();

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                // A MUDANÇA: Alterado de 'bar' para 'line'
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Faturamento Mensal (R$)',
                        data: chartData.faturamento,
                        borderColor: '#4FD1C5', // Ciano para a linha
                        backgroundColor: 'rgba(79, 209, 197, 0.2)', // Ciano transparente para o preenchimento
                        fill: true, // Habilita o preenchimento da área
                        tension: 0.4, // Deixa a linha com curvas suaves
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: {
                        y: { ticks: { color: '#A0AEC0' }, grid: { color: '#4A5568' } },
                        x: { ticks: { color: '#A0AEC0' }, grid: { color: '#4A5568' } }
                    },
                    plugins: { 
                        legend: { display: true, labels: { color: '#CBD5E0' } }, // Reativando a legenda
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
    const melhorMes = vendasData.reduce((prev, current) => (prev.faturamento > current.faturamento) ? prev : current);

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
//   SUB-COMPONENTE: Visão de Metas
// ============================================================================
function MetasView() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    
    const { metaAteHoje, vendasAteHoje, metaDoDia, dataAtual } = metasData;
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
                        circumference: 180, // Meio círculo
                        rotation: -90, // Começa na base
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
            transition={{ duration: 0.5 }}
        >
            <VStack w="100%" maxW="container.xl" mx="auto" gap={8} align="stretch">
                <Heading as="h1" size="xl">Dashboard de Gestão</Heading>

                <Tabs.Root variant="outline" colorScheme="blue" defaultValue="contas">
                    <Tabs.List mb={6}>
                        <Tabs.Trigger value="contas">
                            <HStack><Icon as={PiCoins} /><Text>Contas a Pagar/Receber</Text></HStack>
                        </Tabs.Trigger>
                        <Tabs.Trigger value="estoque">
                            <HStack><Icon as={PiCalendarCheck} /><Text>Dias de Estoque</Text></HStack>
                        </Tabs.Trigger>
                        <Tabs.Trigger value="vendas">
                            <HStack><Icon as={PiChartBar} /><Text>Vendas</Text></HStack>
                        </Tabs.Trigger>
                        <Tabs.Trigger value="metas">
                            <HStack><Icon as={PiTarget} /><Text>Metas</Text></HStack>
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="contas"><ContasChart /></Tabs.Content>
                    <Tabs.Content value="metas"><MetasView /></Tabs.Content>
                    <Tabs.Content value="vendas"><VendasChart /></Tabs.Content>
                    <Tabs.Content value="estoque"><EstoqueChart /></Tabs.Content>
                </Tabs.Root>
            </VStack>
        </MotionFlex>
    );
}
