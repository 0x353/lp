document.getElementById("resultModalContainer").innerHTML = `
<div id="resultModal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal('resultModal')">&times;</span>
    <h2>Hong Kong (HK) Results Today</h2>
    <br>
    <table class="lottery-table">
      <thead>
        <tr>
          <th style="color: #ffffff;">4D</th>
          <th style="color: #ffffff;">3D</th>
          <th style="color: #ffffff;">2D&gt;</th>
          <th style="color: #ffffff;">&lt;2D</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td contenteditable="true">12</td>
          <td contenteditable="true">34</td>
          <td contenteditable="true">56</td>
          <td contenteditable="true">78</td>
        </tr>
      </tbody>
    </table>
    <br>
    <h3>History (Last 7 Days)</h3>
    <br>
    <table class="history-table">
      <thead>
        <tr>
          <th style="color: #ffffff;">Date</th>
          <th style="color: #ffffff;">4D</th>
          <th style="color: #ffffff;">3D</th>
          <th style="color: #ffffff;">2D&gt;</th>
          <th style="color: #ffffff;">&lt;2D</th>
        </tr>
      </thead>
      <tbody id="historyBody">
        <tr><td style="color: orange;">2024-10-01</td><td>11</td><td>22</td><td>33</td><td>44</td></tr>
        <tr><td style="color: orange;">2024-09-30</td><td>55</td><td>66</td><td>77</td><td>88</td></tr>
        <tr><td style="color: orange;">2024-09-29</td><td>12</td><td>23</td><td>34</td><td>45</td></tr>
        <tr><td style="color: orange;">2024-09-28</td><td>67</td><td>78</td><td>89</td><td>90</td></tr>
        <tr><td style="color: orange;">2024-09-27</td><td>10</td><td>20</td><td>30</td><td>40</td></tr>
        <tr><td style="color: orange;">2024-09-26</td><td>13</td><td>24</td><td>35</td><td>46</td></tr>
        <tr><td style="color: orange;">2024-09-25</td><td>99</td><td>88</td><td>77</td><td>66</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;