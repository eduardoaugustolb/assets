# Ícones por estrutura

[Preview interativo](https://eduardoaugustolb.github.io/assets/) · [Assets](../README.md) · [Manifesto](manifest.json) · [Direitos](../LICENSE.md)

Pequenas formas, desenhadas com o mesmo cuidado do conjunto. Esta é a versão Markdown da página de preview e documentação. Ajustes de tamanho, cor, busca e cópia estão na [versão HTML](https://eduardoaugustolb.github.io/assets/); aqui, as prévias são estáticas.

**6 ícones · SVG · 24 × 24 · 0.1.0-draft.1 · piloto em revisão.**

## O lote inicial

| Preview | Nome / SVG inline | Uso no portfólio | Imagem externa |
|---|---|---|---|
| <picture><source media="(prefers-color-scheme: dark)" srcset="svg/paper/arrow-up-right.svg"><img src="svg/ink/arrow-up-right.svg" width="32" height="32" alt="Seta diagonal"></picture> | [`arrow-up-right`](svg/arrow-up-right.svg) | CTAs, links de projetos e contato | [Tinta](svg/ink/arrow-up-right.svg) · [Papel](svg/paper/arrow-up-right.svg) |
| <picture><source media="(prefers-color-scheme: dark)" srcset="svg/paper/arrow-down.svg"><img src="svg/ink/arrow-down.svg" width="32" height="32" alt="Seta para baixo"></picture> | [`arrow-down`](svg/arrow-down.svg) | Convite para descer ao capítulo Sobre | [Tinta](svg/ink/arrow-down.svg) · [Papel](svg/paper/arrow-down.svg) |
| <picture><source media="(prefers-color-scheme: dark)" srcset="svg/paper/arrow-up.svg"><img src="svg/ink/arrow-up.svg" width="32" height="32" alt="Seta para cima"></picture> | [`arrow-up`](svg/arrow-up.svg) | Retorno ao início pelo rodapé | [Tinta](svg/ink/arrow-up.svg) · [Papel](svg/paper/arrow-up.svg) |
| <picture><source media="(prefers-color-scheme: dark)" srcset="svg/paper/plus.svg"><img src="svg/ink/plus.svg" width="32" height="32" alt="Expandir"></picture> | [`plus`](svg/plus.svg) | Detalhes dos projetos e marcas decorativas nos cantos | [Tinta](svg/ink/plus.svg) · [Papel](svg/paper/plus.svg) |
| <picture><source media="(prefers-color-scheme: dark)" srcset="svg/paper/pause.svg"><img src="svg/ink/pause.svg" width="32" height="32" alt="Pausar"></picture> | [`pause`](svg/pause.svg) | Pausar a gravura interativa e a cena da página 404 | [Tinta](svg/ink/pause.svg) · [Papel](svg/paper/pause.svg) |
| <picture><source media="(prefers-color-scheme: dark)" srcset="svg/paper/play.svg"><img src="svg/ink/play.svg" width="32" height="32" alt="Reproduzir"></picture> | [`play`](svg/play.svg) | Retomar a animação após pausa | [Tinta](svg/ink/play.svg) · [Papel](svg/paper/play.svg) |

## Da forma ao uso

SVGs em svg/ usam currentColor para inclusão inline. Imagens externas não herdam a cor CSS: escolha ink sobre fundos claros e paper sobre fundos escuros. Tamanho e cor no preview não alteram os arquivos originais.

Lote piloto em revisão. Os SVGs já estão disponíveis; ainda não há pacote em registro, componentes React próprios ou adaptador Astro distribuível. Os exemplos mostram como usar os arquivos avulsos.

Os caminhos nos exemplos partem da raiz de um projeto que contém a pasta `icons/`; adapte-os ao seu consumidor. O catálogo acima usa caminhos relativos a esta pasta do repositório. Não há instalação de pacote. A consulta e a cópia técnica não substituem autorização de uso.

### HTML · SVG inline

A cor vem do CSS. O texto dá nome ao link e o ícone é decorativo.

```html
<a href="#projetos" class="project-link">
  Conhecer os projetos
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><g transform="rotate(45 12 12)"><path d="M5 10.75L9.88 5.87C11.05 4.7 12.95 4.7 14.12 5.87L19 10.75L17.76 11.99L12.88 7.11C12.39 6.62 11.61 6.62 11.12 7.11L6.24 11.99Z"/><path d="M11.125 9.25H12.875V20.5H11.125Z"/></g></svg>
</a>
<style>
  .project-link { color: #0b0b0b; }
  .project-link svg { width: 20px; height: 20px; }
</style>
```

### CSS · cor por máscara

Exemplo de uso com o SVG avulso. O seletor deve ser aplicado a um elemento decorativo com aria-hidden="true".

```css
.icon-arrow {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background: currentColor;
  mask: url("./icons/svg/arrow-up-right.svg") center / contain no-repeat;
  -webkit-mask: url("./icons/svg/arrow-up-right.svg") center / contain no-repeat;
}
```

### JavaScript · trocar o estado

O exemplo pressupõe um botão #motion com texto e uma imagem. Ele troca a apresentação; conecte também o estado à animação real do seu projeto.

```js
const button = document.querySelector("#motion");
const image = button.querySelector("img");
const label = button.querySelector("span");
button.addEventListener("click", () => {
  const paused = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(paused));
  label.textContent = paused ? "Retomar animação" : "Pausar animação";
  image.src = "./icons/svg/ink/" + (paused ? "play" : "pause") + ".svg";
});
```

### Astro · imagem local

Copie a variante autorizada para public/icons/ink/. Uma imagem externa usa a cor gravada no SVG, sem herdar currentColor da página.

```astro
<a href="#projetos">
  Conhecer os projetos
  <img src="/icons/ink/arrow-up-right.svg"
       width="20" height="20" alt="" />
</a>
```

### React · imagem local

Exemplo com <img>, sem pacote React específico. Copie o SVG autorizado para o diretório público da aplicação e adapte o caminho ao seu framework.

```jsx
export function ProjectLink() {
  return (
    <a href="#projetos">
      Conhecer os projetos
      <img src="/icons/ink/arrow-up-right.svg"
           width={20} height={20} alt="" />
    </a>
  );
}
```

### Markdown · README do GitHub

O caminho abaixo parte da raiz de um repositório que contém icons/. Para fundos claros, use ink; para escuros, paper. Em outros repositórios, copie o SVG autorizado ou use uma URL raw fixada em commit.

```md
<picture>
  <source media="(prefers-color-scheme: dark)"
          srcset="icons/svg/paper/arrow-up-right.svg">
  <img src="icons/svg/ink/arrow-up-right.svg"
       width="24" height="24" alt="Abrir projeto">
</picture>
```

## Forma com intenção

Curvas contidas, terminais retos e cortes por espaço negativo. Os seis pictogramas partem de uma grade de 24 unidades e foram desenhados para os controles do portfólio.

Os SVGs não contêm imagens raster, fontes, scripts ou recursos externos. A leitura foi inspecionada em tamanhos pequenos, mas não houve teste de compreensão com público. Os cortes têm menor definição em 13 px, reservado a decoração no portfólio; priorize 16 px ou mais nos usos funcionais.

## Acessibilidade

Quando houver texto equivalente no controle, trate o ícone como decorativo: aria-hidden="true" no SVG inline ou alt="" em uma imagem. Se o ícone comunicar informação sozinho, dê um nome acessível ao controle ou um texto alternativo à imagem. Foco, alvo de toque e estado pertencem ao controle.

## Direitos de uso

Todos os direitos reservados sobre ícones e código próprios. A disponibilidade pública e os botões de cópia não concedem licença geral de reutilização. Obtenha autorização do titular antes de usar os materiais. As fontes desta página têm licença SIL OFL própria.

[Condições completas](../LICENSE.md) · [Fontes e licenças da página](../site/fonts/) · [Portfólio](https://eduardoaugusto.work/)
