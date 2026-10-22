# Ícones autorais

[Início](../README.md) · [Direitos](../LICENSE.md) · [Manifesto](manifest.json)

Estado: **lote piloto em revisão**, versão `0.1.0-draft.1`. São seis desenhos: arrow-up-right, arrow-down, arrow-up, plus, pause e play. Logos e monograma pessoal estão em [brand/logos](../brand/logos/) e não integram a coleção de pictogramas funcionais.

## Direção

Estrutura revelada: curvas, cortes e espaços negativos organizam cada forma. A coleção será monocromática, com leitura prioritária em tamanhos de interface. O lote piloto deve verificar setas, ações, navegação, documentos e camadas antes da expansão.

## Entregas planejadas

| Ambiente | Forma de distribuição |
|---|---|
| HTML/JavaScript | SVG avulso e inclusão inline |
| CSS | Máscaras opcionais com cor configurável |
| React | Componentes individuais com tipos |
| Astro | SVG estático; integração específica se necessária |
| Markdown/GitHub | Imagens SVG com variantes para fundos claros e escuros |

Os [SVGs avulsos](svg/) estão disponíveis nesta distribuição. Componentes React, adaptador Astro distribuível e folha CSS ainda não estão implementados. A integração Astro do piloto é local ao portfólio. Não há pacote de instalação publicado.

## SVGs e imagens

Arquivos diretamente em `svg/` usam `currentColor` e podem ser incluídos inline. A cor CSS da página não atravessa uma imagem externa: para `<img>` ou Markdown, escolher [ink](svg/ink/) em fundos claros ou [paper](svg/paper/) em fundos escuros.

Exemplo relativo a este documento:

```md
![Ir para cima](svg/ink/arrow-up.svg)
```

Em outro repositório, copiar o arquivo autorizado ou usar uma URL raw fixada em um commit que contenha essa versão. Não usar o caminho relativo acima fora desta árvore. Os exemplos de README ainda precisam de conferência visual no GitHub quando o piloto for publicado.

Na interface do portfólio, os pictogramas são decorativos e o texto dos controles dá o nome acessível. Se uma imagem transmitir informação sozinha, fornecer texto alternativo adequado.

## Critérios para a primeira entrega

- Desenho vetorial sem imagens raster, fontes, scripts ou recursos externos.
- Consistência óptica em 16, 20, 24 e 32 px.
- Conferência nos fundos preto e papel.
- Exemplos funcionais nos ambientes anunciados, incluindo README no GitHub.
- Definição de nome acessível quando o ícone comunicar informação; tratamento decorativo quando houver texto equivalente.

Os ícones e o código permanecerão com direitos reservados, conforme escolha do titular.
