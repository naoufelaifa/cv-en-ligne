import plotly.graph_objects as go
import plotly.express as px

# Data from the provided JSON
tendances = ["Design Épuré", "Optimisation ATS", "Personal Branding", "Focus Réalisations", 
             "Formats Hybrides", "CV Interactif", "Portfolio Numérique", "IA Générative"]
adoption_candidats = [85, 78, 65, 72, 45, 32, 48, 38]
appreciation_recruteurs = [92, 89, 74, 88, 61, 29, 67, 42]

# Abbreviate trend names to meet 15 character limit
tendances_abbrev = ["Design Épuré", "Optim. ATS", "Pers. Branding", "Focus Réalis.", 
                   "Format Hybride", "CV Interactif", "Portfolio Num.", "IA Générative"]

# Create horizontal bar chart
fig = go.Figure()

# Add bars for candidates adoption
fig.add_trace(go.Bar(
    y=tendances_abbrev,
    x=adoption_candidats,
    name='Adopt. Cand.',
    orientation='h',
    marker_color='#1FB8CD',
    cliponaxis=False
))

# Add bars for recruiters appreciation
fig.add_trace(go.Bar(
    y=tendances_abbrev,
    x=appreciation_recruteurs,
    name='Appréciation',
    orientation='h',
    marker_color='#DB4545',
    cliponaxis=False
))

# Update layout with shortened title to meet 40 character limit
fig.update_layout(
    title='Tendances CV 2025: Adopt. & Appréciation',
    xaxis_title='Pourcentage (%)',
    yaxis_title='Tendances',
    barmode='group',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Save the chart
fig.write_image("cv_trends_2025.png")